// src/config/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'db', // 'db' is the Docker service name
  database: process.env.POSTGRES_DB || 'products',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: Number(process.env.POSTGRES_PORT) || 5432,
});

export default pool;