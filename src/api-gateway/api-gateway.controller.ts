import { 
  Controller, Get, Post, Put, Delete, Body, Param, Query, Inject,
  HttpException, HttpStatus
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ApiGatewayController {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  @Get('health')
  async healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'api-gateway',
      version: '1.0.0',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    };
  }

  // ===========================================
  // VERSION 1 ENDPOINTS
  // ===========================================
  @Get('v1/products')
  async getAllProducts() {
    try {
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'get_all_products' }, {})
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch products',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('v1/products/search')
  async searchProducts(@Query('query') query: string) {
    try {
      if (!query || query.trim().length === 0) {
        throw new HttpException('Search query is required', HttpStatus.BAD_REQUEST);
      }
      
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'search_products' }, query.trim())
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Search failed',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('v1/products/:id')
  async getProduct(@Param('id') id: string) {
    try {
      if (!id || id.trim().length === 0) {
        throw new HttpException('Product ID is required', HttpStatus.BAD_REQUEST);
      }
      
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'get_product_by_id' }, id.trim())
      );
      
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      
      return product;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch product',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  @Post('v1/products')
  async createProduct(@Body() product: CreateProductDto) {
    try {
      const createdProduct = await firstValueFrom(
        this.productsClient.send({ cmd: 'create_product' }, product)
      );
      
      return {
        message: 'Product created successfully',
        product: createdProduct,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create product',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('v1/products/:id')
  async updateProduct(@Param('id') id: string, @Body() product: UpdateProductDto) {
    try {
      if (!id || id.trim().length === 0) {
        throw new HttpException('Product ID is required', HttpStatus.BAD_REQUEST);
      }
      
      const updatedProduct = await firstValueFrom(
        this.productsClient.send({ cmd: 'update_product' }, { 
          id: id.trim(), 
          updateData: product 
        })
      );
      
      if (!updatedProduct) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      
      return {
        message: 'Product updated successfully',
        product: updatedProduct,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update product',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('v1/products/:id')
  async deleteProduct(@Param('id') id: string) {
    try {
      if (!id || id.trim().length === 0) {
        throw new HttpException('Product ID is required', HttpStatus.BAD_REQUEST);
      }
      
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'delete_product' }, id.trim())
      );
      
      if (!result) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      
      return {
        message: 'Product deleted successfully',
        product: result,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete product',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ===========================================
  // FUTURE: VERSION 2 ENDPOINTS (EXAMPLE)
  // ===========================================
  /*
  @Get('v2/products')
  async getAllProductsV2() {
    // Enhanced version with pagination, filtering, etc.
    try {
      const products = await firstValueFrom(
        this.productsClient.send({ cmd: 'get_all_products_v2' }, {})
      );
      
      return {
        data: products,
        metadata: {
          version: '2.0.0',
          timestamp: new Date().toISOString(),
          pagination: { page: 1, limit: 10, total: products.length }
        }
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch products',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('v2/products')
  async createProductV2(@Body() product: CreateProductDto) {
    // Enhanced version with additional validation, audit trail, etc.
    try {
      const createdProduct = await firstValueFrom(
        this.productsClient.send({ cmd: 'create_product_v2' }, product)
      );
      
      return {
        message: 'Product created successfully (v2)',
        product: createdProduct,
        metadata: {
          version: '2.0.0',
          created_at: new Date().toISOString(),
          audit_id: `audit_${Date.now()}`
        }
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create product',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  */
}