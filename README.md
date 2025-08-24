# Product Catalog Microservice

A modern microservice architecture built with NestJS, featuring an API Gateway and Product Microservice, with full CI/CD pipeline and AWS ECS deployment.

## 🚀 Features

- **Microservice Architecture**: API Gateway + Product Microservice
- **RESTful API**: Full CRUD operations for products
- **API Versioning**: Version 1 endpoints
- **Health Checks**: Built-in monitoring endpoints
- **Docker Containerization**: Ready-to-run images
- **CI/CD Pipeline**: GitHub Actions automation
- **Cloud Deployment**: AWS ECS Fargate ready

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐
│   API Gateway  │◄──►│   Microservice   │
│   (Port 3000)  │    │   (Port 3001)    │
└─────────────────┘    └──────────────────┘
```

## 📋 Prerequisites

- Docker Desktop
- AWS Account (for cloud deployment)
- Docker Hub account

---

## 🛠️ How to Run Locally

### Option 1: Using Pre-built Docker Images (Recommended)

```bash
# Pull the latest images from Docker Hub
docker pull jaiman25/product-microservice:main
docker pull jaiman25/product-api-gateway:main

# Create a network for communication
docker network create product-network

# Run microservice first
docker run -d --name microservice --network product-network -p 3001:3001 \
  jaiman25/product-microservice:main

# Run API Gateway
docker run -d --name api-gateway --network product-network -p 3000:3000 \
  -e MICROSERVICE_HOST=microservice \
  -e MICROSERVICE_PORT=3001 \
  jaiman25/product-api-gateway:main

# Check if containers are running
docker ps

# Test the API
curl http://localhost:3000/health
```

### Option 2: Build and Run Locally

```bash
# Clone repository
git clone https://github.com/jaiman25400/Product-Catalog-Microservice.git
cd product-catalog-microservice

# Install dependencies
npm install

# Build the application
npm run build

# Start microservice
npm run start:microservice

# In another terminal, start API Gateway
npm run start:gateway
```

## 🌐 API Endpoints

### Base URL
- **Local**: `http://localhost:3000`

### Health Check
```
GET /health
```
**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-08-24T17:52:49.322Z",
  "service": "api-gateway",
  "version": "1.0.0",
  "uptime": 786.027854975,
  "environment": "production"
}
```

### Version 1 API Endpoints

#### Products
```
GET    /v1/products              - Get all products
POST   /v1/products              - Create a new product
GET    /v1/products/:id          - Get product by ID
PUT    /v1/products/:id          - Update product by ID
DELETE /v1/products/:id          - Delete product by ID
GET    /v1/products/search?query= - Search products
```

#### Example Requests

**Create Product:**
```bash
POST /v1/products
Content-Type: application/json

{
  "name": "Table",
  "description": "A table description",
  "price": 29.99,
  "category": "Furniture"
}
```

**Search Products:**
```bash
GET /v1/products/search?query=laptop
```

---

## ☁️ How to Deploy to Cloud (AWS ECS)

### Prerequisites
- AWS Account
- Docker images pushed to Docker Hub
- Basic AWS console knowledge

### Step-by-Step Deployment

#### 1. Create ECS Cluster
1. **AWS Console** → **ECS** → **Create Cluster**
2. **Cluster name**: `product-catalog-cluster`
3. **Infrastructure**: AWS Fargate (serverless)
4. Click **Create**

#### 2. Create Task Definitions

**Microservice Task Definition:**
- **Name**: `product-microservice-task`
- **Memory**: 0.5 GB, **CPU**: 0.25 vCPU
- **Container**: `YOUR_DOCKERHUB_USERNAME/product-microservice:main`
- **Port**: 3001:3001

**API Gateway Task Definition:**
- **Name**: `product-api-gateway-task`
- **Memory**: 0.5 GB, **CPU**: 0.25 vCPU
- **Container**: `YOUR_DOCKERHUB_USERNAME/product-api-gateway:main`
- **Port**: 3000:3000
- **Environment Variables**:
  - `MICROSERVICE_HOST`: [microservice service name]
  - `MICROSERVICE_PORT`: 3001

#### 3. Create ECS Services

**Microservice Service:**
- **Service name**: `microservice`
- **Task Definition**: `product-microservice-task`
- **VPC**: Default VPC
- **Subnets**: Public subnets
- **Auto-assign public IP**: Enable

**API Gateway Service:**
- **Service name**: `api-gateway`
- **Task Definition**: `product-api-gateway-task`
- **VPC**: Default VPC
- **Subnets**: Public subnets
- **Auto-assign public IP**: Enable

#### 4. Configure Security Groups
1. **EC2 Console** → **Security Groups**
2. **Find default security group**
3. **Add inbound rules**:
   ```
   Type: Custom TCP, Port: 3000, Source: 0.0.0.0/0
   Type: Custom TCP, Port: 3001, Source: 0.0.0.0/0
   ```

#### 5. Test Deployment
1. **Wait for services to start** (Status: RUNNING)
2. **Get public IP** from API Gateway service
3. **Test endpoints**:
   ```
   GET http://PUBLIC_IP:3000/health
   GET http://PUBLIC_IP:3000/v1/products
   ```

### Cleanup
1. **Update services** → Set desired count to 0
2. **Delete services** → **Delete task definitions** → **Delete cluster**

---

## 🔄 CI/CD Pipeline

The project includes a GitHub Actions CI/CD pipeline that:

1. **Installs dependencies**
2. **Runs tests**
3. **Builds Docker images**
4. **Pushes to Docker Hub**

**Trigger**: Push to `main` branch

---

## 🧪 Testing

```bash
# Run tests
npm test -- api-gateway.controller.spec.ts

---

## 📁 Project Structure

```
src/
├── api-gateway/           # API Gateway service
├── microservices/         # Product microservice
├── filters/              # Exception filters
├── interceptors/         # Request/response interceptors
└── exceptions/           # Custom exceptions
```

---

## 🚀 Quick Start Commands

```bash
# Local development
npm install
npm run build
npm run start:microservice    # Terminal 1
npm run start:gateway         # Terminal 2

# Docker (pre-built images)
docker pull YOUR_USERNAME/product-microservice:main
docker pull YOUR_USERNAME/product-api-gateway:main
docker network create product-network
docker run -d --name microservice --network product-network -p 3001:3001 YOUR_USERNAME/product-microservice:main
docker run -d --name api-gateway --network product-network -p 3000:3000 -e MICROSERVICE_HOST=microservice YOUR_USERNAME/product-api-gateway:main

# Test API
curl http://localhost:3000/health
curl http://localhost:3000/v1/products
```

---

## 📝 License

This project is licensed under the MIT License.

---

**Built with NestJS, Docker, and AWS ECS Fargate**

*This project demonstrates modern microservice architecture, containerization, CI/CD practices, and cloud deployment.*