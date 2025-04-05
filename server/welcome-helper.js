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
    <style>
        :root {
            --primary-color: #ff385c;
            --secondary-color: #4361ee;
            --accent-color: #2c3e50;
            --text-color: #333;
            --light-text: #666;
            --background-color: #f5f7fa;
            --card-shadow: 0 15px 30px rgba(0,0,0,0.1);
            --transition: all 0.3s ease;
        }
        
        body {
            font-family: 'Noto Sans SC', sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--background-color);
            color: var(--text-color);
        }

        .welcome-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            text-align: center;
            padding: 2rem;
        }
        
        .welcome-card {
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 16px;
            padding: 3rem;
            max-width: 800px;
            box-shadow: var(--card-shadow);
            color: var(--text-color);
            animation: fadeIn 0.8s ease;
        }
        
        .welcome-logo {
            font-size: 4rem;
            margin-bottom: 1.5rem;
            color: var(--primary-color);
        }
        
        .welcome-title {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            color: var(--accent-color);
        }
        
        .welcome-description {
            font-size: 1.1rem;
            margin-bottom: 2rem;
            line-height: 1.6;
            color: var(--light-text);
        }
        
        .welcome-features {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1.5rem;
            margin-bottom: 2.5rem;
        }
        
        .welcome-feature {
            flex: 0 0 200px;
            background-color: rgba(67, 97, 238, 0.05);
            padding: 1.5rem;
            border-radius: 12px;
            transition: var(--transition);
        }
        
        .welcome-feature:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .welcome-feature i {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--secondary-color);
        }
        
        .welcome-feature h3 {
            margin-bottom: 0.5rem;
            color: var(--accent-color);
        }
        
        .welcome-actions {
            display: flex;
            gap: 1.5rem;
            margin-top: 2rem;
        }
        
        .welcome-btn {
            padding: 1rem 2rem;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 500;
            text-decoration: none;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        
        .welcome-btn.primary {
            background-color: var(--primary-color);
            color: white;
            border: none;
        }
        
        .welcome-btn.primary:hover {
            background-color: #e4254a;
            transform: translateY(-3px);
            box-shadow: 0 8px 16px rgba(255, 56, 92, 0.3);
        }
        
        .welcome-btn.secondary {
            background-color: white;
            color: var(--secondary-color);
            border: 2px solid var(--secondary-color);
        }
        
        .welcome-btn.secondary:hover {
            background-color: var(--secondary-color);
            color: white;
            transform: translateY(-3px);
            box-shadow: 0 8px 16px rgba(67, 97, 238, 0.3);
        }
        
        .welcome-btn i {
            margin-right: 0.8rem;
        }

        @media (max-width: 768px) {
            .welcome-card {
                padding: 2rem;
            }
            
            .welcome-features {
                flex-direction: column;
                align-items: center;
            }
            
            .welcome-feature {
                width: 100%;
                max-width: 300px;
            }
            
            .welcome-actions {
                flex-direction: column;
            }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body class="welcome-page">
    <div class="welcome-container">
        <div class="welcome-card">
            <div class="welcome-logo">
                <i class="fas fa-fire-alt"></i>
            </div>
            <h1 class="welcome-title">热搜榜单 V1.0</h1>
            <p class="welcome-description">
                热搜榜单是一款集成了微博、知乎和百度热搜的综合平台，结合AI技术为您生成相关热点的图文内容，让您轻松了解最新热点事件。
            </p>
            
            <div class="welcome-features">
                <div class="welcome-feature">
                    <i class="fas fa-chart-line"></i>
                    <h3>实时热搜</h3>
                    <p>实时聚合各大平台热搜榜，让您一站式了解热门话题</p>
                </div>
                <div class="welcome-feature">
                    <i class="fas fa-robot"></i>
                    <h3>AI图文生成</h3>
                    <p>基于人工智能生成高质量的热点内容解析和相关图片</p>
                </div>
                <div class="welcome-feature">
                    <i class="fas fa-sync-alt"></i>
                    <h3>定时更新</h3>
                    <p>自动定时更新热搜数据，确保信息始终保持最新状态</p>
                </div>
            </div>
            
            <div class="welcome-actions">
                <a href="login.html" class="welcome-btn primary">
                    <i class="fas fa-sign-in-alt"></i> 登录
                </a>
                <a href="register.html" class="welcome-btn secondary">
                    <i class="fas fa-user-plus"></i> 注册新账户
                </a>
                <a href="index.html" class="welcome-btn secondary">
                    <i class="fas fa-arrow-right"></i> 直接访问
                </a>
            </div>
        </div>
    </div>

    <script>
        // 页面加载完成后处理按钮点击事件
        document.addEventListener('DOMContentLoaded', function() {
            // 获取所有按钮
            var buttons = document.querySelectorAll('.welcome-btn');
            
            // 为每个按钮添加点击事件
            buttons.forEach(function(button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    var href = this.getAttribute('href');
                    window.location.href = href;
                });
            });
        });
    </script>
</body>
</html>`;

// 一些基本的CSS样式，以防样式表加载失败
const basicCssContent = `
:root {
  --primary-color: #ff385c;
  --secondary-color: #4361ee;
  --accent-color: #2c3e50;
  --text-color: #333;
  --light-text: #666;
  --background-color: #f5f7fa;
  --card-shadow: 0 15px 30px rgba(0,0,0,0.1);
  --transition: all 0.3s ease;
}

body {
  font-family: 'Noto Sans SC', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--accent-color);
  margin-top: 0;
}

a {
  color: var(--secondary-color);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  color: var(--primary-color);
}

/* 欢迎页面样式 */
.welcome-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.welcome-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  flex: 1;
}

.welcome-content {
  background-color: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: var(--card-shadow);
  margin-bottom: 2rem;
}

.welcome-logo i {
  font-size: 4rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.welcome-desc {
  color: var(--light-text);
  max-width: 600px;
  margin: 0 auto 2rem;
}

.feature-list {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-item {
  flex: 1;
  max-width: 200px;
  padding: 1.5rem;
  background-color: rgba(67, 97, 238, 0.05);
  border-radius: 10px;
  transition: var(--transition);
}

.feature-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.feature-item i {
  font-size: 2.5rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
}

.auth-buttons {
  margin-top: 2rem;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  margin: 0 8px;
  border-radius: 50px;
  font-weight: 500;
  text-align: center;
  transition: var(--transition);
  cursor: pointer;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #e4254a;
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(255, 56, 92, 0.3);
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
  border: none;
}

.btn-secondary:hover {
  background-color: #3551d1;
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(67, 97, 238, 0.3);
}

.btn-tertiary {
  background-color: #34495e;
  color: white;
  border: none;
}

.btn-tertiary:hover {
  background-color: #2c3e50;
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(52, 73, 94, 0.3);
}

/* 响应式样式 */
@media (max-width: 768px) {
  .feature-list {
    flex-direction: column;
    align-items: center;
  }
  
  .feature-item {
    width: 100%;
    max-width: 300px;
  }
  
  .auth-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .btn {
    margin: 0;
  }
}

/* 登录和注册页面 */
.auth-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}

.auth-form-container {
  max-width: 500px;
  width: 100%;
  margin: auto;
  padding: 2rem;
}

.auth-form {
  background-color: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
}

.auth-logo {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.auth-subtitle {
  color: var(--light-text);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: var(--transition);
}

.form-input:focus {
  border-color: var(--secondary-color);
  outline: none;
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
}

.auth-btn {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;
}

.auth-link {
  color: var(--secondary-color);
  font-weight: 500;
}

.auth-link:hover {
  color: var(--primary-color);
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