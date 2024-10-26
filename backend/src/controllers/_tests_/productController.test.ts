// src/controllers/__tests__/productController.test.ts
import request from 'supertest';
import app from '../../app';
import pool from '../../config/db';

jest.mock('../../config/db'); // Mock database to prevent real DB calls

describe('Product Controller', () => {
  afterAll(async () => {
    await pool.end(); // Close the connection pool after tests
  });

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [{ id: 1, name: 'Test Product' }] });
      const response = await request(app).get('/api/products');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ id: 1, name: 'Test Product' }]);
    });

    it('should return empty array if no products exist', async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });
      const response = await request(app).get('/api/products');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /api/products', () => {
    it('should add a new product', async () => {
      const newProduct = { name: 'New Product', description: 'New Product Description', price: 100, quantity: 10 };
      const addedProduct = { id: 1, ...newProduct };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [addedProduct] });

      const response = await request(app).post('/api/products').send(newProduct);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(addedProduct);
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update an existing product', async () => {
      const updatedProduct = { name: 'Updated Product', description: 'Updated Description', price: 150, quantity: 5 };
      const resultProduct = { id: 1, ...updatedProduct };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [resultProduct] });

      const response = await request(app).put('/api/products/1').send(updatedProduct);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(resultProduct);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete a product', async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({});

      const response = await request(app).delete('/api/products/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Product deleted' });
    });
  });
});