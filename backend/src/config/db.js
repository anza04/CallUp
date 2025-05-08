import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 5
});

export const query = async (sql, params = []) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(sql, params);
    return rows;
  } catch (err) {
    console.error("Database query error:", err.message);
    throw new Error('Database operation failed');
  } finally {
    if (conn) conn.release();
  }
};
