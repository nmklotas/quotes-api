FROM node:16.13.2-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:prod
RUN npm prune --production

FROM node:16.13.2-alpine as prod
WORKDIR /app
COPY --from=builder ./app/package*.json ./
COPY --from=builder ./app/node_modules ./node_modules
COPY --from=builder ./app/dist ./dist
ENV NODE_ENV=production
HEALTHCHECK --interval=30s --timeout=30s --start-period=10s --retries=3 CMD [ "node", "dist/healthcheck.js" ]
CMD [ "npm", "run", "start:prod" ]