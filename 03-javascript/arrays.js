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
    name: "Node API Boilerplate",
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
    name: "MongoDB Schema Guide",
    price: 15,
    category: "backend",
    rating: 4.2,
    inStock: true,
  },
  {
    id: 5,
    name: "Next.js Starter",
    price: 39,
    category: "frontend",
    rating: 4.9,
    inStock: true,
  },
  {
    id: 6,
    name: "Express Middleware Kit",
    price: 25,
    category: "backend",
    rating: 4.0,
    inStock: false,
  },
  {
    id: 7,
    name: "TypeScript Handbook",
    price: 35,
    category: "fullstack",
    rating: 4.7,
    inStock: true,
  },
  {
    id: 8,
    name: "Docker for Devs",
    price: 45,
    category: "devops",
    rating: 4.6,
    inStock: true,
  },
];

const productNames = products.map((product) => product.name);
console.log(productNames);

const pricesWithTax = products.map((product) => product.price * 1.18);
console.log(pricesWithTax);

const nameAndPrice = products.map((product) => ({
  name: product.name,
  price: product.price,
}));
console.log(nameAndPrice);

const fProducts = products.filter((product) => product.category === "frontend");
console.log(fProducts);

const topProducts = products.filter((product) => product.rating > 4.5);
console.log(topProducts);

const inStockProdcuts = products
  .filter((product) => product.inStock === true)
  .filter((product) => product.price < 40);

console.log(inStockProdcuts);

const productPrices = products.map((p) => p.price);
console.log(productPrices);

const totalPrice = productPrices.reduce((accumulator, current) => {
  return accumulator + current;
}, 0);

console.log(totalPrice);

const inStockProdcutsTotalPrice = products
  .filter((product) => product.inStock === true)
  .filter((product) => product.price < 40)
  .map((p) => p.price)
  .reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);

console.log(inStockProdcutsTotalPrice);

const categoryCounts = products.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] || 0) + 1;
  return acc;
}, {});

console.log(categoryCounts);

const productId5 = products.find((p) => p.id === 5);
console.log(productId5);

const firstOutOfStockProduct = products.find((p) => p.inStock === false);
console.log(firstOutOfStockProduct);

const topRatedProduct = products.reduce((best, current) => {
  return current.rating > best.rating ? current : best;
}, products[0]);

console.log(topRatedProduct);

const isProduct40 = products.some((p) => p.price > 40);
console.log(isProduct40);

const isGoodRating = products.every((p) => p.rating > 3.5);
console.log(isGoodRating);

const isEveryFrontEndProductinStock = products
  .filter((p) => p.category === "frontend")
  .every((p) => p.inStock === true);

console.log(isEveryFrontEndProductinStock);

const inStockBackendProducts = products
  .filter((p) => p.category === "backend" && p.inStock === true)
  .sort((a, b) => a.price - b.price)
  .map((p) => p.name);
console.log(inStockBackendProducts);

const frontendRevenue = products
  .filter((product) => product.category === "frontend")
  .reduce((total, product) => total + product.price, 0);

console.log(frontendRevenue);

const topRatedProducts = [...products].sort((a, b) => b.rating - a.rating);
console.log(topRatedProducts);

const top3RatedProducts = [...products]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 3)
  .map((p) => p.name);

console.log(top3RatedProducts);

const allProductNames = products.map((p) => p.name).join("|");

console.log(allProductNames);
