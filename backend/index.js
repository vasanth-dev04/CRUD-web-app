const express = require("express");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Working Fine..." });
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});