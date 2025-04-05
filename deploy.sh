#!/bin/bash

# 热搜榜单网站部署脚本
echo "开始部署热搜榜单网站到Cloudflare..."

# 检查wrangler是否已安装
if ! command -v wrangler &> /dev/null; then
    echo "正在安装wrangler..."
    npm install -g wrangler
fi

# 确保已登录
echo "请确保已登录到Cloudflare账户（如未登录，请运行 'wrangler login'）"

# 发布到Cloudflare
echo "正在发布到Cloudflare Workers..."
wrangler deploy

echo "部署完成！"
echo "网站现在可以通过以下URL访问："
echo "https://test-hot-app.starcoolice.workers.dev" 