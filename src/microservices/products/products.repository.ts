import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [];
  private idCounter = 1;

  constructor() {
    // Initialize with dummy data
    this.initializeDummyData();
  }

  private initializeDummyData() {
    const dummyProducts = [
      {
        id: (this.idCounter++).toString(),
        name: 'Smartphone',
        description: 'Latest model with advanced camera',
        price: 899.99,
        category: 'Electronics',
      },
      {
        id: (this.idCounter++).toString(),
        name: 'Running Shoes',
        description: 'Lightweight shoes for running',
        price: 79.99,
        category: 'Sports',
      },
      {
        id: (this.idCounter++).toString(),
        name: 'Wireless Headphones',
        description: 'Noise-cancelling headphones',
        price: 149.99,
        category: 'Electronics',
      },
      {
        id: (this.idCounter++).toString(),
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat',
        price: 29.99,
        category: 'Sports',
      },
    ];

    this.products = dummyProducts;
  }

  findAll(): Product[] {
    return this.products;
  }

  findById(id: string): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  create(productData: Omit<Product, 'id'>): Product {
    const id = (this.idCounter++).toString();
    const product = new Product({ id, ...productData });
    this.products.push(product);
    return product;
  }

  update(id: string, updateData: Partial<Product>): Product | undefined {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) return undefined;

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateData,
      id, // Ensure ID doesn't change
    };

    return this.products[productIndex];
  }

  delete(id: string): boolean {
    const initialLength = this.products.length;
    this.products = this.products.filter((product) => product.id !== id);
    return this.products.length < initialLength;
  }

  search(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase();
    const res = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery),
    );
    return res;
  }
}
