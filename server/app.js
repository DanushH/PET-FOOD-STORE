import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware to allow cross-origin requests from frontend
app.use(cors({
    origin: "http://localhost:5173" // Allow requests from React app's origin
}));

app.use(express.json());
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});
