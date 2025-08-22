import { Test, TestingModule } from '@nestjs/testing';
import { ApiGatewayController } from './api-gateway.controller';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('ApiGatewayController', () => {
  let controller: ApiGatewayController;
  let productsClient: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiGatewayController],
      providers: [
        {
          provide: 'PRODUCTS_SERVICE',
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ApiGatewayController>(ApiGatewayController);
    productsClient = module.get<ClientProxy>('PRODUCTS_SERVICE');
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const mockProducts = [{ id: '1', name: 'Test Product' }];
      
      // Mock the client response
      jest.spyOn(productsClient, 'send').mockReturnValue(of(mockProducts));
      
      const result = await controller.getAllProducts();
      
      expect(result).toEqual(mockProducts);
      expect(productsClient.send).toHaveBeenCalledWith(
        { cmd: 'get_all_products' },
        {}
      );
    });
  });

  describe('createProduct', () => {
    it('should create a product and return success message', async () => {
      const mockProduct = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        category: 'Test Category'
      };
      
      const createdProduct = { id: '1', ...mockProduct };
      
      // Mock the client response
      jest.spyOn(productsClient, 'send').mockReturnValue(of(createdProduct));
      
      const result = await controller.createProduct(mockProduct);
      
      expect(result).toEqual({
        message: 'Product created successfully',
        product: createdProduct
      });
      expect(productsClient.send).toHaveBeenCalledWith(
        { cmd: 'create_product' },
        mockProduct
      );
    });
  });
});