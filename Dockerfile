FROM node:18-alpine AS builder
RUN npm install -g pnpm
RUN npm install -g nest-cli
WORKDIR /usr/src/app
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:18-alpine
RUN npm install -g pnpm
RUN npm install -g nest-cli
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --prod
CMD ["pnpm", "run", "start:dev"]
