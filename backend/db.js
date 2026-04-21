const mysql = require("mysql2/promise");
require("dotenv").config();

// Connection string
const db = mysql.createPool({
    host:process.env.DB_HOST || "localhost",
    user:process.env.DB_USER || "root",
    password:process.env.DB_PASSSWORD || "",
    database:process.env.DB_NAME || "sample_db",
});

// Test connection

(async()=>{
    try {
        const connection = await db.getConnection();
        console.log("Server is running...");
        connection.release();
    } catch(error){
        console.error("MySQL connection failed:", err);
    }
})();

module.exports = db;