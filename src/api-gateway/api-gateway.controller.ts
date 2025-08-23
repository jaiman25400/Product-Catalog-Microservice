import { 
  Controller, Get, Post, Put, Delete, Body, Param, Query, Inject,
  HttpException, HttpStatus, Version
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
  @Version('1')
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

  @Get('v1/products')
  @Version('1')
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
  @Version('1')
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
  @Version('1')
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
  @Version('1')
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
  @Version('1')
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
  @Version('1')
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
}