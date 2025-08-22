import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from 'src/api-gateway/dto/create-product.dto';
import { ProductNotFoundException, InvalidProductDataException } from 'src/exceptions/product-not-found.exception';

@Controller()
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'get_all_products' })
  async getAll() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      this.logger.error('Error in get_all_products:', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_product_by_id' })
  async getById(@Payload() id: string) {
    try {
      const product = await this.productsService.findOne(id);
      if (!product) {
        throw new ProductNotFoundException(id);
      }
      return product;
    } catch (error) {
      this.logger.error(`Error in get_product_by_id for ID ${id}:`, error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'create_product' })
  async create(@Payload() productData: CreateProductDto) {
    try {
      // Additional validation
      if (productData.price < 0) {
        throw new InvalidProductDataException('Price cannot be negative');
      }
      
      return await this.productsService.create(productData);
    } catch (error) {
      this.logger.error('Error in create_product:', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'update_product' })
  async update(@Payload() data: { id: string; updateData: Partial<Product> }) {
    try {
      const product = await this.productsService.findOne(data.id);
      if (!product) {
        throw new ProductNotFoundException(data.id);
      }
      
      return await this.productsService.update(data.id, data.updateData);
    } catch (error) {
      this.logger.error(`Error in update_product for ID ${data.id}:`, error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'delete_product' })
  async delete(@Payload() id: string) {
    try {
      const product = await this.productsService.findOne(id);
      if (!product) {
        throw new ProductNotFoundException(id);
      }
      
      const result = await this.productsService.remove(id);
      return result;
    } catch (error) {
      this.logger.error(`Error in delete_product for ID ${id}:`, error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'search_products' })
  async search(@Payload() query: string) {
    try {
      if (!query || query.trim().length === 0) {
        return [];
      }
      
      return await this.productsService.search(query.trim());
    } catch (error) {
      this.logger.error(`Error in search_products for query ${query}:`, error);
      throw error;
    }
  }
}