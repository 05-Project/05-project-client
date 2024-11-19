FROM node:alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM node:alpine 

WORKDIR /app

ENV NODE_ENV production
ENV HOSTNAME 0.0.0.0

COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public ./public
COPY package.json package-lock.json ./

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "dev" ]