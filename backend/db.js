const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    ssl: {
        rejectUnauthorized: true
    },
    connectTimeout: 30000,

});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log("Database connected successfully!");
        connection.release();
    } catch(error) {
        console.error("MySQL connection failed:", error);
    }
})();

module.exports = db;