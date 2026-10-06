FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN rm -f tsconfig.build.tsbuildinfo tsconfig.build.test.tsbuildinfo && npm run build

FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production --ignore-scripts && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY scripts/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY scripts/railway-start.sh /usr/local/bin/railway-start.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh /usr/local/bin/railway-start.sh && mkdir -p logs && chown -R node:node /app

USER node

EXPOSE 3000

ENTRYPOINT ["railway-start.sh"]
