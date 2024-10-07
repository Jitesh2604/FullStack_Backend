require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_PART_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
}));

app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, async() => {
    try {
        await connectDB();
        console.log(`Server is running on port ${PORT}`);
    } catch (err) {
        console.log("Server is Failder", err);
    }
})