import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './products.repository';
import {
  InvalidProductDataException,
  ProductNotFoundException,
} from 'src/exceptions/product-not-found.exception';
import { CreateProductDto } from 'src/api-gateway/dto/create-product.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private readonly repository: ProductsRepository) {}

  async create(productData: CreateProductDto): Promise<Product> {
    if (!productData.name || !productData.price || !productData.category) {
      throw new InvalidProductDataException(
        'Name, price, and category are required',
      );
    }

    if (productData.price <= 0) {
      throw new InvalidProductDataException('Price must be a positive number');
    }

    return this.repository.create(productData);
  }

  async findAll(): Promise<Product[]> {
    try {
      this.logger.log('Retrieving all products');
      return await this.repository.findAll();
    } catch (error) {
      this.logger.error(
        `Error retrieving products: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to retrieve products');
    }
  }

  async findOne(id: string): Promise<Product> {
    console.log('Find One ID: ',id)
    const product = await this.repository.findById(id);
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return product;
  }

  async update(id: string, updateData: Partial<Product>): Promise<Product> {
    try {
      this.logger.log(`Updating product with ID: ${id}`);

      // Check if product exists
      const existingProduct = await this.repository.findById(id);
      if (!existingProduct) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      // Validate price if provided
      if (updateData.price !== undefined && updateData.price <= 0) {
        throw new BadRequestException('Price must be a positive number');
      }

      const updatedProduct = await this.repository.update(id, updateData);

      if (!updatedProduct) {
        throw new Error(`Failed to update product with ID ${id}`);
      }

      return updatedProduct;
    } catch (error) {
      this.logger.error(
        `Error updating product ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string): Promise<{ success: boolean; message: string }> {
    try {
      this.logger.log(`Deleting product with ID: ${id}`);

      // Check if product exists
      const existingProduct = await this.repository.findById(id);
      if (!existingProduct) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      const success = await this.repository.delete(id);

      return {
        success,
        message: success
          ? `Product with ID ${id} deleted successfully`
          : `Failed to delete product with ID ${id}`,
      };
    } catch (error) {
      this.logger.error(
        `Error deleting product ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async search(query: string): Promise<Product[]> {
    try {
      this.logger.log(`Searching products with query: ${query}`);

      if (!query || query.trim().length < 2) {
        throw new BadRequestException(
          'Search query must be at least 2 characters long',
        );
      }
      return await this.repository.search(query.trim());
    } catch (error) {
      this.logger.error(
        `Error searching products with query ${query}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
