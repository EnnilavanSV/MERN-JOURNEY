const { add, subtract, multiply, percentage } = require("./math");
const { capitalize, truncate, slugify } = require("./strings");

console.log("=== MATH ===");
console.log("add(10, 5):", add(10, 5));
console.log("subtract(10, 5):", subtract(10, 5));
console.log("multiply(10, 5):", multiply(10, 5));
console.log("percentage(200, 18):", percentage(200, 18));

console.log("\n=== STRINGS ===");
console.log("capitalize:", capitalize("hello world"));
console.log("truncate:", truncate("React Dashboard Template", 10));
console.log("slugify:", slugify("Hello World"));
console.log("slugify:", slugify("React & Node.js"));

const products = [
  { name: "react dashboard template", price: 49 },
  { name: "node api boilerplate kit", price: 29 },
  { name: "typescript handbook guide", price: 35 },
];

products.forEach((p) => {
  const tax = percentage(p.price, 18);
  const total = add(p.price, tax);

  console.log(`
Product : ${capitalize(p.name)}
Slug    : ${slugify(p.name)}
Preview : ${truncate(p.name, 15)}
Price   : $${p.price}
Tax 18% : $${tax.toFixed(2)}
Total   : $${total.toFixed(2)}
  `);
});
