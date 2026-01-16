# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# 运行时
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm \
    && pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist


EXPOSE 3000

CMD [ "node", "dist/app.js" ]