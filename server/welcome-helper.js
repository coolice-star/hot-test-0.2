// welcome.html页面的原始内容 - 这只是一个备份，以防静态内容加载失败
const welcomeHtmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>欢迎使用热搜榜单</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
</head>
<body class="welcome-page">
    <div class="welcome-container">
        <div class="welcome-content">
            <div class="welcome-logo">
                <i class="fas fa-fire"></i>
            </div>
            <h1>热搜榜单<span class="version">V1.0</span></h1>
            <p class="welcome-desc">探索当下热门话题，掌握实时资讯</p>
            
            <div class="feature-list">
                <div class="feature-item">
                    <i class="fas fa-list-ol"></i>
                    <span>实时热搜榜单</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-robot"></i>
                    <span>AI内容生成</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-sync-alt"></i>
                    <span>定时更新</span>
                </div>
            </div>
            
            <div class="auth-buttons">
                <a href="login.html" class="btn btn-primary">登录</a>
                <a href="register.html" class="btn btn-secondary">注册</a>
                <a href="index.html" class="btn btn-tertiary">直接访问 <i class="fas fa-arrow-right"></i></a>
            </div>
            
            <div class="platforms">
                <div class="platform">
                    <i class="fab fa-weibo"></i>
                    <span>微博</span>
                </div>
                <div class="platform">
                    <i class="fa-solid fa-circle-question"></i>
                    <span>知乎</span>
                </div>
                <div class="platform">
                    <i class="fa-brands fa-baidu"></i>
                    <span>百度</span>
                </div>
            </div>
        </div>
        
        <footer class="welcome-footer">
            <p>&copy; 2024 热搜榜单 | <a href="#">隐私政策</a> | <a href="#">使用条款</a></p>
        </footer>
    </div>
</body>
</html>`;

// 一些基本的CSS样式，以防样式表加载失败
const basicCssContent = `
body {
  font-family: 'Noto Sans SC', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
  color: #333;
}
.welcome-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}
h1 {
  font-size: 2.5rem;
  color: #2c3e50;
}
.btn {
  display: inline-block;
  padding: 12px 24px;
  margin: 10px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}
.btn-primary {
  background-color: #3498db;
  color: white;
}
.btn-secondary {
  background-color: #2ecc71;
  color: white;
}
.btn-tertiary {
  background-color: #34495e;
  color: white;
}
`;

// welcome页面处理助手
export async function getWelcomePage(request, env, corsHeaders) {
  try {
    // 尝试从静态资源获取welcome.html
    const response = await env.__STATIC_CONTENT.get('welcome.html');
    
    if (response === null) {
      // 如果静态资源中没有welcome.html，返回备份内容
      return new Response(welcomeHtmlContent, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          ...corsHeaders
        }
      });
    }
    
    // 如果获取成功，返回静态资源内容
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error('获取welcome页面失败:', error);
    
    // 如果获取失败，返回备份内容
    return new Response(welcomeHtmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        ...corsHeaders
      }
    });
  }
}

// 获取基本CSS样式
export async function getBasicCss(request, env, corsHeaders) {
  try {
    // 尝试从静态资源获取styles.css
    const response = await env.__STATIC_CONTENT.get('styles.css');
    
    if (response === null) {
      // 如果静态资源中没有styles.css，返回备份内容
      return new Response(basicCssContent, {
        headers: {
          'Content-Type': 'text/css; charset=utf-8',
          ...corsHeaders
        }
      });
    }
    
    // 如果获取成功，返回静态资源内容
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/css; charset=utf-8',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error('获取CSS样式失败:', error);
    
    // 如果获取失败，返回备份内容
    return new Response(basicCssContent, {
      headers: {
        'Content-Type': 'text/css; charset=utf-8',
        ...corsHeaders
      }
    });
  }
} 