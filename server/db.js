import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Muat variabel lingkungan dari server/.env
dotenv.config({ path: path.join(__dirname, '.env') });

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'spk_guru_db',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Fungsi untuk mengetes koneksi database saat server mulai
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log(`[Database] Berhasil terhubung ke MySQL database: ${process.env.DB_NAME || 'spk_guru_db'}`);
    connection.release();
    return true;
  } catch (error) {
    console.error('[Database] Gagal terhubung ke MySQL:', error.message);
    return false;
  }
}

export default pool;

