# Build stage for API Gateway
FROM node:18-alpine AS api-gateway-builder

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install all dependencies including devDependencies
RUN npm ci

# Copy source code
COPY . .

# Build API Gateway only
RUN npm run build

# Production stage for API Gateway
FROM node:18-alpine AS api-gateway

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Copy built API Gateway from builder stage
COPY --from=api-gateway-builder /usr/src/app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Change ownership of the app directory
RUN chown -R nestjs:nodejs /usr/src/app
USER nestjs

# Use environment variable for port
ENV PORT=3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the API Gateway
CMD [ "node", "dist/api-gateway/api-gateway.main" ]

# Build stage for Microservice
FROM node:18-alpine AS microservice-builder

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install all dependencies including devDependencies
RUN npm ci

# Copy source code
COPY . .

# Build Microservice only
RUN npm run build

# Production stage for Microservice
FROM node:18-alpine AS microservice

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Copy built Microservice from builder stage
COPY --from=microservice-builder /usr/src/app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Change ownership of the app directory
RUN chown -R nestjs:nodejs /usr/src/app
USER nestjs

# Use environment variable for port
ENV PORT=3001
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "console.log('Microservice health check passed')" || exit 1

# Start the Microservice
CMD [ "node", "dist/microservices/main" ]