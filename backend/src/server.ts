// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import { Pool } from 'pg';

// // Use environment variables for the database connection
// const pool = new Pool({
//   user: process.env.POSTGRES_USER || 'postgres',
//   host: process.env.POSTGRES_HOST || 'db', // Use the service name 'db' from docker-compose.yml
//   database: process.env.POSTGRES_DB || 'products',
//   password: process.env.POSTGRES_PASSWORD || 'password',
//   port: Number(process.env.POSTGRES_PORT) || 5432,
// });

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // GET all products
// app.get('/api/products', async (req: Request, res: Response): Promise<void> => {
//     try {
//       const result = await pool.query('SELECT * FROM products');
  
//       // Check if any products exist
//       if (result.rows.length === 0) {
//         res.status(200).json([]); // Return an empty array if no products are found
//         return; // End the function execution
//       }
  
//       res.status(200).json(result.rows); // Return the fetched products
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  

// // POST a new product
// app.post('/api/products', async (req: Request, res: Response) => {
//   try {
//     const { name, description, price, quantity } = req.body;
//     const result = await pool.query(
//       'INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
//       [name, description, price, quantity]
//     );
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error adding product:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // PUT update a product
// app.put('/api/products/:id', async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { name, description, price, quantity } = req.body;
//     const result = await pool.query(
//       'UPDATE products SET name = $1, description = $2, price = $3, quantity = $4 WHERE id = $5 RETURNING *',
//       [name, description, price, quantity, id]
//     );
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error updating product:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // DELETE a product
// app.delete('/api/products/:id', async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     await pool.query('DELETE FROM products WHERE id = $1', [id]);
//     res.json({ message: 'Product deleted' });
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.use(cors());

// // Start the server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// src/server.ts
import app from './app';

// Start the server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
