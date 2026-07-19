const fs = require("fs");
const path = require("path");

fs.writeFileSync("data.txt", "DevMarket data");
console.log("File created");

const content = fs.readFileSync("data.txt", "utf-8");
console.log("data.text:", content);

fs.appendFileSync("data.txt", "--updated--");
console.log("File updated");

const updated = fs.readFileSync("data.txt", "utf-8");
console.log("data.text:", updated);

const outputDir = path.join(__dirname, "output");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
  console.log("output directory created");
} else {
  console.log("output directory already exists");
}

const products = [
  { id: 1, name: "React Dashboard", price: 49, category: "frontend" },
  { id: 2, name: "Node API Kit", price: 29, category: "backend" },
  { id: 3, name: "TypeScript Guide", price: 35, category: "fullstack" },
];

const productsPath = path.join(outputDir, "products.json");
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
console.log("✅ Written output/products.json");

const raw = fs.readFileSync(productsPath, "utf-8");
const parsed = JSON.parse(raw);
console.log("Products from JSON");
parsed.forEach((p) => {
  console.log(`  - ${p.name} ($${p.price}) [${p.category}]`);
});

const files = fs.readdirSync(__dirname);
console.log("Files in current directory:");
files.forEach((file) => {
  console.log(`  - ${file}`);
});
