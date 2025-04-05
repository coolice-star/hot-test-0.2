// 直接导出Worker处理函数
export default {
  async fetch(request, env, ctx) {
    // 从URL中获取路径
    const url = new URL(request.url);
    const path = url.pathname;
    
    console.log(`主入口收到请求: ${path}`);
    
    // CORS头
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    // 处理OPTIONS请求
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
        status: 204,
      });
    }
    
    try {
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
          },
          status: 200
        });
      }
      
      // 处理根路径
      if (path === '/' || path === '') {
        // 重定向到welcome.html
        return Response.redirect(`${url.origin}/welcome.html`, 302);
      }
      
      // 处理静态资源
      let assetPath = path;
      
      // 尝试获取静态资源
      try {
        // 直接使用env.__STATIC_CONTENT访问静态资源
        const response = await env.__STATIC_CONTENT.fetch(request);
        
        // 添加CORS头
        const newHeaders = new Headers(response.headers);
        for (const [key, value] of Object.entries(corsHeaders)) {
          newHeaders.set(key, value);
        }
        
        return new Response(response.body, {
          status: response.status,
          headers: newHeaders
        });
      } catch (error) {
        console.error(`获取静态资源失败: ${assetPath}`, error);
        return new Response(`找不到页面: ${assetPath}`, { 
          status: 404,
          headers: {
            'Content-Type': 'text/plain',
            ...corsHeaders
          }
        });
      }
    } catch (error) {
      console.error('处理请求时出错:', error);
      return new Response('服务器错误', { 
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
          ...corsHeaders
        }
      });
    }
  }
}; 