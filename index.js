// 导入helper函数
import { getWelcomePage, getBasicCss } from './server/welcome-helper.js';
import { getAuthJs } from './server/auth-helper.js';

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

    // 特殊处理auth.js
    if (path === '/auth.js') {
      return getAuthJs(request, env, corsHeaders);
    }

    // 特殊处理welcome.html
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

    // 获取文件扩展名和内容类型
    const extension = path.match(/\.[^.]*$/) || [''];
    const contentType = contentTypes[extension[0]] || 'text/plain; charset=utf-8';

    try {
      // 获取所有静态文件的列表
      let keys = await env.__STATIC_CONTENT.list();
      console.log('可用的静态资源:', keys);
      
      // 标准化请求路径（去除前导斜杠）
      const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
      console.log('查找资源:', normalizedPath);
      
      // 尝试直接获取资源
      let asset = null;
      try {
        // 尝试不同的获取方法
        try {
          asset = await env.__STATIC_CONTENT.get(normalizedPath);
        } catch (error) {
          console.log('直接get失败，尝试其他方法');
          
          // 尝试通过资源名获取
          const possibleKeys = keys.keys.map(k => k.name);
          const matchedKey = possibleKeys.find(k => 
            k === normalizedPath || 
            k.includes(path.split('.')[0]) && k.endsWith(extension[0])
          );
          
          if (matchedKey) {
            console.log('找到匹配的键:', matchedKey);
            asset = await env.__STATIC_CONTENT.get(matchedKey);
          } else {
            console.log('未找到匹配的键');
          }
        }
      } catch (error) {
        console.error('尝试获取静态资源失败:', error);
      }
      
      if (asset) {
        // 如果找到资源，返回它
        return new Response(asset.body, {
          headers: {
            'Content-Type': contentType,
            ...corsHeaders
          }
        });
      }
      
      // 如果资源未找到，尝试通过fetch API获取
      try {
        const cacheKey = new Request(url.toString(), {
          headers: { 'Cache-Control': 'no-cache' }
        });
        
        // 尝试fetch
        const response = await env.__STATIC_CONTENT.fetch(cacheKey);
        
        if (response.status === 200) {
          // 找到资源，添加正确的内容类型并返回
          const responseHeaders = new Headers(response.headers);
          responseHeaders.set('Content-Type', contentType);
          Object.keys(corsHeaders).forEach(key => {
            responseHeaders.set(key, corsHeaders[key]);
          });
          
          return new Response(response.body, {
            headers: responseHeaders
          });
        }
      } catch (fetchError) {
        console.error('fetch尝试失败:', fetchError);
      }
      
      // 处理其他静态文件
      if (path.endsWith('.js')) {
        // 对于JS文件，如果是auth.js，返回备份内容
        if (path === '/auth.js') {
          return getAuthJs(request, env, corsHeaders);
        }
        
        // 对于其他JS文件，返回一个空的JS以避免控制台错误
        console.log('返回空的JS文件:', path);
        return new Response('// Empty JS file', {
          headers: {
            'Content-Type': 'application/javascript; charset=utf-8',
            ...corsHeaders
          }
        });
      }
      
      // 对于其他请求，重定向到welcome.html
      return Response.redirect(`${url.origin}/welcome.html`, 302);
    } catch (error) {
      console.error('处理请求时出错:', error);
      
      // 为关键路径提供备份内容
      if (path === '/welcome.html') {
        return getWelcomePage(request, env, corsHeaders);
      }
      
      if (path === '/styles.css') {
        return getBasicCss(request, env, corsHeaders);
      }
      
      if (path === '/auth.js') {
        return getAuthJs(request, env, corsHeaders);
      }
      
      // 对于其他错误，重定向到首页
      return Response.redirect(`${url.origin}/welcome.html`, 302);
    }
  }
}; 