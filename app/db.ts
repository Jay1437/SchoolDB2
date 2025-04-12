import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,             // e.g., "mysql-1226af23-jaydipc1437-3e9c.f.aivencloud.com"
  user: process.env.DB_USER,             // e.g., "avnadmin"
  password: process.env.DB_PASSWORD,     // e.g., "AVNS_yRPbt5lefYUCZaZnjSM"
  database: process.env.DB_NAME,         // e.g., "defaultdb"
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false,           // Required for Aiven SSL connections
  },
});

export default db;
