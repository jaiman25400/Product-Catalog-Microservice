export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}