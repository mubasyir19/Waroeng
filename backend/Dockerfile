# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma Client ke src/generated/prisma
RUN npx prisma generate

# Copy source code
COPY . .

# Build NestJS app (TypeScript akan compile generated client juga)
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy built assets
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3000

# Start command
CMD sh -c "npx prisma migrate deploy && npx prisma db seed && node dist/src/main"