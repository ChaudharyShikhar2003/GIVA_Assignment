// src/controllers/productController.ts
import { Request, Response } from 'express';
import pool from '../config/db';

// GET all products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM products');
    if (result.rows.length === 0) {
      res.status(200).json([]);
      return;
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST a new product
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity } = req.body;
    const result = await pool.query(
      'INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, quantity]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, quantity = $4 WHERE id = $5 RETURNING *',
      [name, description, price, quantity, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};