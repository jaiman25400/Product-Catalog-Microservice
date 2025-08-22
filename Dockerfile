# Build stage
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install all dependencies including devDependencies
RUN npm ci

# Copy source code
COPY . .

# Build both applications
RUN npm run build

# Production stage for API Gateway
FROM node:18-alpine AS api-gateway

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Use environment variable for port
ENV PORT=3000
EXPOSE 3000

# Start the API Gateway
CMD [ "node", "dist/api-gateway/api-gateway.main" ]

# Production stage for Microservice
FROM node:18-alpine AS microservice

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Use environment variable for port
ENV PORT=3001
EXPOSE 3001

# Start the Microservice
CMD [ "node", "dist/microservices/main" ]