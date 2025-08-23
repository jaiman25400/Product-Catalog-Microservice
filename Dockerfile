# ===========================================
# MICROSERVICE IMAGE
# ===========================================

# Build stage for Microservice
FROM node:18-alpine AS microservice-builder

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install ALL dependencies (including devDependencies for building)
RUN npm ci

# Copy source code
COPY . .

# Build the microservice
RUN npm run build

# Production stage for Microservice
FROM node:18-alpine AS microservice

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built microservice from builder stage
COPY --from=microservice-builder /usr/src/app/dist ./dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Change ownership of the app directory
RUN chown -R nestjs:nodejs /usr/src/app
USER nestjs

# Expose microservice port
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Start the microservice
CMD ["node", "dist/microservices/main"]

# ===========================================
# API GATEWAY IMAGE
# ===========================================

# Build stage for API Gateway
FROM node:18-alpine AS api-gateway-builder

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install ALL dependencies (including devDependencies for building)
RUN npm ci

# Copy source code
COPY . .

# Build the API Gateway
RUN npm run build

# Production stage for API Gateway
FROM node:18-alpine AS api-gateway

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built API Gateway from builder stage
COPY --from=api-gateway-builder /usr/src/app/dist ./dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Change ownership of the app directory
RUN chown -R nestjs:nodejs /usr/src/app
USER nestjs

# Expose API Gateway port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the API Gateway
CMD ["node", "dist/api-gateway/api-gateway.main"]