const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const path = require("path");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/user/auth", require("./routes/user/authRoutes"));
app.use("/api/admin/auth", require("./routes/admin/adminAuthRoutes"));

app.use("/api/user/products", require("./routes/user/productRoutes"));
app.use("/api/admin/products", require("./routes/admin/adminProductRoutes"));

app.use("/api/user/cart", require("./routes/user/cartRoutes"));
app.use("/api/user/wishlist", require("./routes/user/wishlistRoutes"));

app.use("/api/user/orders", require("./routes/user/orderRoutes"));
app.use("/api/admin/orders", require("./routes/admin/adminOrderRoutes"));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
