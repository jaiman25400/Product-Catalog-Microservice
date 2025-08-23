# ===========================================
# SHARED BUILDER STAGE (Builds everything once)
# ===========================================
FROM node:18-alpine AS shared-builder

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install ALL dependencies (including devDependencies for building)
RUN npm ci

# Copy source code
COPY . .

# Build the entire application (both microservice and API gateway)
RUN npm run build

# ===========================================
# MICROSERVICE IMAGE
# ===========================================
FROM node:18-alpine AS microservice

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built microservice from shared builder stage
COPY --from=shared-builder /usr/src/app/dist ./dist

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
FROM node:18-alpine AS api-gateway

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built API Gateway from shared builder stage
COPY --from=shared-builder /usr/src/app/dist ./dist

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