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

const express = require("express");

const app = express();
app.use(express.json());

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
app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

app.get("/products", (req, res) => {
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
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

app.post("/products", (req, res) => {
  const { name, price, category, rating, inStock } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      error: "Name and price are required",
    });
  }
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category: category || "general",
    rating: rating || 0,
    inStock: inStock !== undefined ? inStock : true,
  };
  products.push(newProduct);
  res
    .status(201)
    .json({ message: "Product added successfully", product: newProduct });
});

app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (!name || !price) {
    return res
      .status(400)
      .json({ error: "Name and price required for full update" });
  }

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
});

app.patch("/products/:id", (req, res) => {
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
});

app.delete("/products/:id", (req, res) => {
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
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found", path: req.originalUrl });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
