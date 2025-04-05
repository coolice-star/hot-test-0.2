// 导入welcome页面处理助手
import { getWelcomePage, getBasicCss } from './server/welcome-helper.js';

// Cloudflare Workers静态资源处理
export default {
  async fetch(request, env, ctx) {
    // 获取请求URL
    const url = new URL(request.url);
    const path = url.pathname;
    
    console.log(`收到请求: ${path}`);

    // 设置CORS头
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    };

    // 处理OPTIONS请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    // 处理API请求
    if (path.startsWith('/api')) {
      return new Response(JSON.stringify({
        message: '热搜榜单API服务正在运行',
        status: 'online',
        version: '1.0.0'
      }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // 处理根路径请求 - 重定向到welcome.html
    if (path === '/' || path === '') {
      return Response.redirect(`${url.origin}/welcome.html`, 302);
    }

    // 特殊处理welcome.html页面
    if (path === '/welcome.html') {
      return getWelcomePage(request, env, corsHeaders);
    }

    // 特殊处理styles.css
    if (path === '/styles.css') {
      return getBasicCss(request, env, corsHeaders);
    }

    // 内容类型映射
    const contentTypes = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    };

    // 获取文件扩展名
    const extension = path.match(/\.[^.]*$/) || [''];
    const contentType = contentTypes[extension[0]] || 'text/plain';

    try {
      // 尝试获取静态资源
      let asset = null;
      
      try {
        // 首先尝试使用KV get方法
        asset = await env.__STATIC_CONTENT.get(path.slice(1));
      } catch (getError) {
        console.log('KV get方法失败，尝试fetch方法');
        try {
          // 如果get方法失败，尝试fetch方法
          const response = await env.__STATIC_CONTENT.fetch(request);
          if (response.status === 200) {
            const blob = await response.blob();
            return new Response(blob, {
              headers: {
                'Content-Type': contentType,
                ...corsHeaders
              }
            });
          }
        } catch (fetchError) {
          console.error('fetch方法也失败:', fetchError);
        }
      }

      if (asset === null) {
        // 如果资源不存在，尝试回退到welcome.html
        if (path !== '/welcome.html') {
          console.log(`资源不存在: ${path}, 尝试回退到welcome.html`);
          return Response.redirect(`${url.origin}/welcome.html`, 302);
        }
        
        // 如果welcome.html也找不到，使用备份
        return getWelcomePage(request, env, corsHeaders);
      }

      // 返回资源内容
      return new Response(asset.body, {
        headers: {
          'Content-Type': contentType,
          ...corsHeaders
        }
      });
    } catch (error) {
      console.error('获取资源出错:', error);
      
      // 如果是welcome.html或styles.css，使用备份
      if (path === '/welcome.html') {
        return getWelcomePage(request, env, corsHeaders);
      }
      
      if (path === '/styles.css') {
        return getBasicCss(request, env, corsHeaders);
      }
      
      // 对于其他路径，重定向到welcome页面
      return Response.redirect(`${url.origin}/welcome.html`, 302);
    }
  }
}; 