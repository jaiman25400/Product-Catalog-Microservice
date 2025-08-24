<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Product Catalog Microservice

A modern, scalable microservice architecture built with NestJS, featuring an API Gateway and Product Microservice, deployed on AWS ECS Fargate.

## 🚀 Features

- **Microservice Architecture**: API Gateway + Product Microservice
- **RESTful API**: Full CRUD operations for products
- **API Versioning**: Version 1 endpoints with future extensibility
- **Health Checks**: Built-in health monitoring endpoints
- **Containerized**: Docker-based deployment
- **CI/CD Pipeline**: Automated build and deployment with GitHub Actions
- **Cloud Deployment**: AWS ECS Fargate deployment ready

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   API Gateway  │    │   Microservice   │    │   Docker Hub    │
│   (Port 3000)  │◄──►│   (Port 3001)    │◄──►│   (Registry)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Public API    │    │  Product Logic   │    │  Image Storage  │
│   (v1)          │    │  & Business      │    │  & Versioning   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

- Node.js 18.x or higher
- Docker Desktop
- AWS Account (for cloud deployment)
- Docker Hub account

## 🛠️ Local Development

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd product-catalog-microservice
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Application

```bash
npm run build
```

### 4. Run Services Locally

#### Option A: Using Docker Compose (Recommended)

```bash
# Build and run both services
docker-compose up --build

# Run in background
docker-compose up --build -d

# Check status
docker-compose ps

# View logs
docker-compose logs api-gateway
docker-compose logs microservice

# Stop services
docker-compose down
```

#### Option B: Manual Docker Commands

```bash
# Build images
docker build --target microservice -t product-microservice:latest .
docker build --target api-gateway -t product-api-gateway:latest .

# Create network
docker network create product-network

# Run microservice
docker run -d --name microservice --network product-network -p 3001:3001 product-microservice:latest

# Run API Gateway
docker run -d --name api-gateway --network product-network -p 3000:3000 \
  -e MICROSERVICE_HOST=microservice \
  -e MICROSERVICE_PORT=3001 \
  product-api-gateway:latest

# Check status
docker ps

# Test API
curl http://localhost:3000/health
```

#### Option C: Direct Node.js (Development)

```bash
# Start microservice
npm run start:microservice

# In another terminal, start API Gateway
npm run start:gateway
```

## 🌐 API Endpoints

### Base URL
- **Local**: `http://localhost:3000`
- **Cloud**: `http://YOUR_PUBLIC_IP:3000`

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
  "name": "Sample Product",
  "description": "A sample product description",
  "price": 29.99
}
```

**Search Products:**
```bash
GET /v1/products/search?query=laptop
```

## ☁️ Cloud Deployment (AWS ECS Fargate)

### Prerequisites
- AWS Account with appropriate permissions
- AWS CLI configured
- Docker images pushed to Docker Hub

### Deployment Steps

#### 1. Create ECS Cluster
1. Go to **AWS ECS Console** → **Create Cluster**
2. **Cluster name**: `product-catalog-cluster`
3. **Infrastructure**: AWS Fargate (serverless)
4. Click **Create**

#### 2. Create Task Definitions

**Microservice Task Definition:**
- **Name**: `product-microservice-task`
- **Memory**: 0.5 GB
- **CPU**: 0.25 vCPU
- **Container**: `YOUR_DOCKERHUB_USERNAME/product-microservice:main`
- **Port**: 3001:3001

**API Gateway Task Definition:**
- **Name**: `product-api-gateway-task`
- **Memory**: 0.5 GB
- **CPU**: 0.25 vCPU
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
1. Go to **EC2 Console** → **Security Groups**
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
2. **Delete services**
3. **Delete task definitions**
4. **Delete cluster**

## 🔄 CI/CD Pipeline

The project includes a GitHub Actions CI/CD pipeline that:

1. **Installs dependencies**
2. **Runs tests**
3. **Builds Docker images**
4. **Pushes to Docker Hub**

**Trigger**: Push to `main` branch

**Pipeline Stages:**
- 🔍 **Code Quality & Testing**
- 🐳 **Docker Build & Push**
- 📋 **Deployment Summary**

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:cov
```

### E2E Tests
```bash
npm run test:e2e
```

## 📁 Project Structure

```
src/
├── api-gateway/           # API Gateway service
│   ├── dto/              # Data Transfer Objects
│   ├── api-gateway.controller.ts
│   ├── api-gateway.module.ts
│   └── api-gateway.main.ts
├── microservices/         # Microservice
│   ├── entities/          # Database entities
│   ├── products/          # Product-related modules
│   └── main.ts           # Microservice entry point
├── filters/              # Exception filters
├── interceptors/         # Request/response interceptors
└── exceptions/           # Custom exceptions
```

## 🔧 Configuration

### Environment Variables

**API Gateway:**
- `PORT`: 3000
- `MICROSERVICE_HOST`: microservice hostname/IP
- `MICROSERVICE_PORT`: 3001
- `NODE_ENV`: development/production

**Microservice:**
- `PORT`: 3001
- `NODE_ENV`: development/production

### Docker Configuration

- **Multi-stage builds** for optimized images
- **Production-ready** configurations
- **Security best practices** (non-root users)

## 🚀 Performance & Scalability

- **Microservice architecture** for independent scaling
- **Docker containerization** for consistent deployment
- **Health checks** for monitoring
- **API versioning** for backward compatibility
- **Load balancing ready** for production use

## 📊 Monitoring & Health

### Health Endpoints
- **API Gateway**: `/health`
- **Microservice**: Console logs with health status

### Logging
- **Structured logging** with NestJS
- **Console output** for development
- **Production-ready** logging configuration

## 🔒 Security Features

- **Input validation** with class-validator
- **Exception handling** with custom filters
- **Non-root Docker containers**
- **Environment-based configuration**
- **Secure communication** between services

## 🛠️ Development Commands

```bash
# Development
npm run start:dev:gateway      # Start API Gateway in watch mode
npm run start:dev:microservice # Start Microservice in watch mode

# Production
npm run start:prod            # Start production build

# Building
npm run build                 # Build application
npm run build:docker         # Build Docker images

# Testing
npm run test                 # Run unit tests
npm run test:watch          # Run tests in watch mode
npm run test:e2e            # Run end-to-end tests
```

## 📝 API Documentation

### Request/Response Examples

**Get All Products:**
```bash
GET /v1/products
```
**Response:**
```json
[
  {
    "id": "1",
    "name": "Sample Product",
    "description": "A sample product",
    "price": 29.99
  }
]
```

**Create Product:**
```bash
POST /v1/products
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 49.99
}
```

**Response:**
```json
{
  "message": "Product created successfully",
  "product": {
    "id": "2",
    "name": "New Product",
    "description": "Product description",
    "price": 49.99
  }
}
```

## 🌟 Future Enhancements

- **Version 2 API** with enhanced features
- **Database integration** (PostgreSQL, MongoDB)
- **Authentication & Authorization**
- **Rate limiting** and API throttling
- **Metrics and monitoring** (Prometheus, Grafana)
- **Kubernetes deployment** manifests
- **Multi-region deployment**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
1. Check the documentation
2. Review existing issues
3. Create a new issue with detailed information

---

**Built with ❤️ using NestJS, Docker, and AWS ECS Fargate**

*This project demonstrates modern microservice architecture, containerization, CI/CD practices, and cloud deployment - perfect for learning and assessment purposes.*
