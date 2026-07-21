const products = [
  {
    id: 1,
    name: "React Dashboard",
    price: 49,
    category: "frontend",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 2,
    name: "Node API Kit",
    price: 29,
    category: "backend",
    rating: 4.5,
    inStock: true,
  },
  {
    id: 3,
    name: "Tailwind UI Kit",
    price: 19,
    category: "frontend",
    rating: 3.8,
    inStock: false,
  },
  {
    id: 4,
    name: "TypeScript Guide",
    price: 35,
    category: "fullstack",
    rating: 4.7,
    inStock: true,
  },
  {
    id: 5,
    name: "Docker for Devs",
    price: 45,
    category: "devops",
    rating: 4.6,
    inStock: true,
  },
];

const validateProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      error: "Name is required and must be string.",
    });
  }
  if (!price || typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      error: " Price is required in number and should be greater than zero.",
    });
  }
  next();
};

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    error: "Too many requests from this IP, please try again later.",
  }, // limit each IP to 100 requests per windowMs
});

const app = express();
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use((req, res, next) => {
  const start = new Date();
  const time = new Date().toLocaleTimeString();
  res.on("finish", () => {
    const duration = new Date() - start;
    const status = res.statusCode;

    const color =
      status >= 500
        ? "\x1b[31m"
        : status >= 400
          ? "\x1b[33m"
          : status >= 200
            ? "\x1b[32m"
            : "\x1b[0m";

    console.log(
      `${color}[${req.method}] ${req.url} — ${status} — ${time} — ${duration}ms\x1b[0m`,
    );
  });
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Dev Market API", version: "1.0.0" });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get("/products", (req, res, next) => {
  try {
    const { category, inStock, sort } = req.query;

    let result = [...products];

    // Filter by category
    if (category) {
      result = result.filter((p) => p.category === category);
    }

    // Filter by inStock
    if (inStock !== undefined) {
      result = result.filter((p) => p.inStock === (inStock === "true"));
    }

    // Sort by price
    if (sort === "price") {
      result.sort((a, b) => a.price - b.price);
    }

    // Add meta info
    res.json({
      count: result.length,
      products: result,
    });
  } catch (err) {
    next(err);
  }
});

app.get("/products/:id", (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
});

app.post("/products", validateProduct, (req, res, next) => {
  try {
    const { name, price, category, rating, inStock } = req.body;
    // No need to check again — validateProduct already validated

    const newProduct = {
      id: products.length + 1,
      name,
      price,
      category: category || "general",
      rating: rating || 0,
      inStock: inStock !== undefined ? inStock : true,
    };

    products.push(newProduct);
    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (err) {
    next(err);
  }
});
app.put("/products/:id", validateProduct, (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    // ← Add this line
    const { name, price, category, rating, inStock } = req.body;

    products[productIndex] = {
      id: productId,
      name,
      price,
      category: category || "general",
      rating: rating || 0,
      inStock: inStock !== undefined ? inStock : true,
    };

    res.json({
      message: "Product replaced successfully",
      product: products[productIndex],
    });
  } catch (err) {
    next(err);
  }
});

app.patch("/products/:id", (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found" });
    }
    products[productIndex] = {
      ...products[productIndex],
      ...req.body,
      id: productId,
    };

    res.json({
      message: "Product updated successfully",
      product: products[productIndex],
    });
  } catch (err) {
    next(err);
  }
});

app.delete("/products/:id", (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found" });
    }
    const deletedProduct = products.splice(productIndex, 1);
    res.json({
      message: "Product deleted successfully",
      product: deletedProduct[0],
    });
  } catch (err) {
    next(err);
  }
});

app.get("/error-test", (req, res, next) => {
  try {
    const string = 1;

    if (typeof string !== "string") {
      throw new Error("Invalid data type encountered!");
    }

    res.status(200).json({ message: "Yes it is a string" });
  } catch (err) {
    next(err); // 🎯 This will now successfully receive the Error object
  }
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found", path: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
