FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 3000

ENV NODE_ENV development

RUN pnpm db:push

CMD ["pnpm", "dev"]
