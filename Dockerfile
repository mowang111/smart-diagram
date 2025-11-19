FROM node:20-alpine

# 设置工作目录
WORKDIR /home/root/workspace

# 安装 pnpm
RUN npm install -g pnpm

# 设置环境变量
ENV NODE_ENV=production
