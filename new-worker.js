/**
 * 热搜榜单网站Worker脚本
 * 基于Cloudflare Worker优化静态资源访问
 */

export default {
  async fetch(request, env, ctx) {
    // 获取请求URL
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    console.log(`处理请求: ${pathname}`);
    
    // 添加CORS响应头
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    // 处理CORS预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }
    
    // 处理API端点
    if (pathname.startsWith('/api/')) {
      return handleApiRequest(request, env, corsHeaders);
    }
    
    // 处理根路径 - 重定向到welcome.html
    if (pathname === '/' || pathname === '') {
      return Response.redirect(`${url.origin}/welcome.html`, 302);
    }
    
    // 处理静态资源请求
    return handleStaticAsset(request, url, pathname, env, corsHeaders);
  }
}

/**
 * 处理API请求
 */
async function handleApiRequest(request, env, corsHeaders) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // API根路径
  if (pathname === '/api' || pathname === '/api/') {
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
  
  // 如果有更多API端点，可以在这里添加
  
  // 默认返回404 - API未找到
  return new Response(JSON.stringify({
    error: 'API端点未找到'
  }), {
    status: 404,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}

/**
 * 处理静态资源请求
 */
async function handleStaticAsset(request, url, pathname, env, corsHeaders) {
  // 获取资源内容类型
  const contentTypeMap = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  };
  
  // 获取文件扩展名
  const fileExtension = pathname.match(/\.[^.]*$/)?.[0] || '';
  const contentType = contentTypeMap[fileExtension] || 'text/plain; charset=utf-8';
  
  // 格式化路径 - 移除开头的斜杠
  const assetPath = pathname.startsWith('/') ? pathname.substring(1) : pathname;
  
  try {
    // 直接从__STATIC_CONTENT获取资源
    const asset = await env.__STATIC_CONTENT.get(assetPath);
    
    // 如果资源存在，返回它
    if (asset) {
      return new Response(asset.body, {
        headers: {
          'Content-Type': contentType,
          ...corsHeaders
        }
      });
    }
    
    // 如果直接get失败，尝试fetch方法
    const assetResponse = await env.__STATIC_CONTENT.fetch(request.url);
    if (assetResponse.status === 200) {
      const responseHeaders = new Headers(assetResponse.headers);
      responseHeaders.set('Content-Type', contentType);
      
      for (const [key, value] of Object.entries(corsHeaders)) {
        responseHeaders.set(key, value);
      }
      
      return new Response(assetResponse.body, {
        status: 200,
        headers: responseHeaders
      });
    }
    
    // 找不到资源，返回404
    if (pathname !== '/welcome.html') {
      // 如果不是welcome.html，重定向到welcome.html
      return Response.redirect(`${url.origin}/welcome.html`, 302);
    }
    
    return new Response('找不到请求的资源', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error(`获取资源 ${assetPath} 失败:`, error);
    
    // 如果出错，返回500错误
    return new Response('服务器错误', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        ...corsHeaders
      }
    });
  }
} 