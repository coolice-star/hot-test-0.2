// Cloudflare Worker版的热搜榜单服务器
// 使用ES模块语法，适配Cloudflare Worker环境

// 初始化用户数据 - 在实际应用中应该使用KV或D1存储
let USERS = { users: [] };

// 处理OPTIONS请求的CORS头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// 处理OPTIONS请求
function handleOptions(request) {
  return new Response(null, {
    headers: corsHeaders,
    status: 204,
  });
}

// 给响应添加CORS头
function addCorsHeaders(response) {
  const newHeaders = new Headers(response.headers);
  for (const [key, value] of Object.entries(corsHeaders)) {
    newHeaders.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

// 处理API请求
async function handleApiRequest(request, url) {
  // API根路径
  if (url.pathname === '/api') {
    return new Response(JSON.stringify({
      message: '热搜榜单API服务正在运行',
      status: 'online',
      version: '1.0.0'
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  }

  // 注册API
  if (url.pathname === '/api/register') {
    try {
      const data = await request.json();
      const { username, password } = data;

      // 验证请求数据
      if (!username || !password) {
        return new Response(JSON.stringify({ success: false, message: '用户名和密码不能为空' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        });
      }

      // 检查用户名是否已存在
      const userExists = USERS.users.some(user => user.username === username);
      if (userExists) {
        return new Response(JSON.stringify({ success: false, message: '用户名已被使用' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        });
      }

      // 生成密码哈希 - 注意：在Worker中使用bcrypt需要特殊处理
      // 这里简化处理，实际应使用Web Crypto API或替代方案
      const hashedPassword = password; // 简化，实际应使用哈希

      // 创建新用户
      const newUser = {
        id: Date.now().toString(),
        username,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      };

      // 添加用户到数据
      USERS.users.push(newUser);
      
      // 在实际应用中，应该保存到KV或D1
      // await env.USERS_KV.put('users', JSON.stringify(USERS));

      // 返回成功响应（不返回密码）
      return new Response(JSON.stringify({
        success: true,
        message: '注册成功',
        user: {
          id: newUser.id,
          username: newUser.username,
          createdAt: newUser.createdAt
        }
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 201
      });
    } catch (error) {
      console.error('注册错误:', error);
      return new Response(JSON.stringify({ success: false, message: '服务器错误' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      });
    }
  }

  // 登录API
  if (url.pathname === '/api/login') {
    try {
      const data = await request.json();
      const { username, password } = data;

      // 验证请求数据
      if (!username || !password) {
        return new Response(JSON.stringify({ success: false, message: '用户名和密码不能为空' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        });
      }

      // 查找用户
      const user = USERS.users.find(user => user.username === username);
      if (!user) {
        return new Response(JSON.stringify({ success: false, message: '用户名不存在' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        });
      }

      // 验证密码 - 简化处理
      const isPasswordValid = (password === user.password);
      if (!isPasswordValid) {
        return new Response(JSON.stringify({ success: false, message: '密码错误' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        });
      }

      // 返回成功响应（不返回密码）
      return new Response(JSON.stringify({
        success: true,
        message: '登录成功',
        user: {
          id: user.id,
          username: user.username,
          createdAt: user.createdAt
        }
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    } catch (error) {
      console.error('登录错误:', error);
      return new Response(JSON.stringify({ success: false, message: '服务器错误' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      });
    }
  }

  // 检查用户名是否可用的API
  if (url.pathname === '/api/check-username') {
    try {
      const data = await request.json();
      const { username } = data;

      // 验证请求数据
      if (!username) {
        return new Response(JSON.stringify({ success: false, message: '用户名不能为空' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        });
      }

      // 检查用户名是否已存在
      const userExists = USERS.users.some(user => user.username === username);

      // 返回结果
      return new Response(JSON.stringify({
        success: true,
        available: !userExists
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    } catch (error) {
      console.error('检查用户名错误:', error);
      return new Response(JSON.stringify({ success: false, message: '服务器错误' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      });
    }
  }

  // 404 - API路径未找到
  return new Response(JSON.stringify({ error: 'API路径未找到' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 404
  });
}

// 处理静态资源请求
async function handleAssetRequest(request, url, env) {
  // 尝试从静态资源中获取
  let path = url.pathname;
  
  // 处理根路径 - 默认返回welcome.html
  if (path === '/' || path === '') {
    path = '/welcome.html';
  }
  
  // 如果没有扩展名，尝试添加.html
  if (!path.includes('.') && !path.endsWith('/')) {
    path = `${path}.html`;
  }

  // 创建一个新的请求来获取静态资源
  const assetUrl = new URL(path, request.url);
  const assetRequest = new Request(assetUrl, request);
  
  try {
    // 使用__STATIC_CONTENT这个特殊变量来访问静态资源
    // 这是Cloudflare Worker的一个内部机制
    return await env.__STATIC_CONTENT.fetch(assetRequest);
  } catch (e) {
    // 如果找不到静态资源，返回404
    return new Response('404 - 找不到页面', { status: 404 });
  }
}

// Worker的主入口点
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 处理CORS预检请求
    if (request.method === "OPTIONS") {
      return handleOptions(request);
    }
    
    // 处理API请求
    if (url.pathname.startsWith('/api')) {
      const response = await handleApiRequest(request, url);
      return addCorsHeaders(response);
    }
    
    // 处理静态资源请求
    const response = await handleAssetRequest(request, url, env);
    return addCorsHeaders(response);
  }
}; 