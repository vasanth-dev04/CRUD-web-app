const express = require("express");
require("dotenv").config();
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");


const app = express(); 
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
}));
app.use(express.json());                         // ← ADD THIS
app.use(express.urlencoded({ extended: true })); // ← AND THIS

app.use("/uploads", express.static("uploads"));

app.get("/", (req,res) => {
    res.json({ message:"Working Fine... "});
});

//Routes
app.use("/api/users", userRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
}); 