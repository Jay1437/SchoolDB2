import mysql from "mysql2/promise";

// Connect to Aiven's `defaultdb`
const db = mysql.createPool({
    host: "mysql-1226af23-jaydipc1437-3e9c.f.aivencloud.com", // Aiven host
    user: "avnadmin", // Aiven username
    password: "AVNS_yRPbt5lefYUCZaZnjSM", // Replace with actual Aiven password
    database: "defaultdb", // Using `defaultdb` (not `schooldb`)
    port: 11370, // Aiven port
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false, // Required for Aiven SSL
    },
});

export default db;
