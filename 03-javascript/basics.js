const name = "Ennilavan";
const age = 22;
let myScore = 0;
const mySkills = ["html", "tailwind", "js", "react", "node"];
const details = {
  name: "Ennilavan",
  age: 22,
  role: "Mern Developer",
  isPremium: false,
};
const skills = "HTML,CSS,JS,React";
const a = 5;
const b = 10;
const random = Math.floor(Math.random() * 100) + 1;
const c = 3.14159;
const role = "seller";
const price = 1000;
const discountPercentage = 10;

console.log(typeof name);
console.log(typeof age);
console.log(typeof myScore);
console.log(typeof mySkills);
console.log(typeof details);

console.log(name.toUpperCase());
console.log(name.length);
console.log(`My name is ${name} and I am ${age} years old.`);
console.log(name.includes("e"));
console.log(mySkills);
console.log(skills.split(","));

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a % b);

console.log(random);

console.log(c.toFixed(2));

console.log(Math.max(5, 12, 3, 99, 7));

if (age > 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}

details.isPremium ? console.log("Pro User") : console.log("Free User");

switch (role) {
  case "admin":
    console.log("Full access");
    break;
  case "seller":
    console.log("Only seller");
    break;
  case "buyer":
    console.log("Only buyer");
    break;
  default:
    console.log("Unknown Role");
}

const calculateDiscount = (price, discount) => {
  const discountedPrice = price * (discount / 100);
  const finalPrice = price - discountedPrice;
  return finalPrice;
};

console.log(calculateDiscount(price, discountPercentage));

const getUserGreeting = (name, role) => {
  const userName = name;
  const userRole = role;
  return `Welcome back ${userName}! You are logged in as ${userRole} `;
};

console.log(getUserGreeting(name, role));

function greetDefaultUser(name = "Guest") {
  return `Hi! ${name}`;
}

console.log(greetDefaultUser());

mySkills.forEach((skills, index) => {
  console.log(`${index + 1}. ${skills}`);
});

for (const key in details) {
  console.log(`${key}: ${details[key]}`);
}

for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    continue;
  }
  console.log(i);
}
