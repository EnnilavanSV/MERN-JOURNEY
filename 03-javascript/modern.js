/*const user = { name: "Ennilavan", age: 22, role: "seller" };
const skills = ["HTML", "CSS", "JavaScript", "React"];
const skills2 = ["Mongodb", "Node", "Express", "React"];
const product = {
  name: "React Dashboard",
  seller: {
    name: "Ennilavan",
  },
  address: {
    city: "Chennai",
  },
};

const { name, age, role: userRole, isPremium = false } = user;
const [first, second] = skills;

console.log(userRole);
console.log(isPremium);

console.log(first);
console.log(second);

const [head, ...rest] = skills;
console.log(rest);

const {
  address: { city },
} = product;

console.log(city);

const combinedSkills = [...skills, ...skills2];
console.log(combinedSkills);

const newSkills = [...skills, "Notion"];
console.log(newSkills);

const newUpdatedUser = { ...user, age: 23 };
console.log(newUpdatedUser);

const sumAll = (...numbers) => {
  return numbers.reduce((total, current) => total + current, 0);
};

console.log(sumAll(1, 2, 3));

const isLoggedIn = true;

isLoggedIn && console.log("Welcome!!");

"" || console.log("Anonymous");

const score = 0;

const withOr = score || "No score yet";
const withNullish = score ?? "No score yet";

console.log("Using || :", withOr);
console.log("Using ?? :", withNullish);

const users = [
  {
    name: "Ennilavan",
    address: {
      city: "Chennai",
      pincode: "641001",
    },
  },
  {
    name: "Arjun",
  },
];

console.log(users[0]?.address?.city);
console.log(users[1]?.address?.city);
console.log(users[2]?.address?.city);

const city1 = users[1]?.address?.city ?? "City not provided";
console.log(city1);

const userName = "Ennilavan";
const userRole1 = "Buyer";

const userShort = { userName, userRole1 };

console.log(userShort);

const createShorthandObject = (name, age) => {
  return { name, age };
};

console.log(createShorthandObject("sethu", 21));

const key = "skill";
const value = "HTML";

const obj = {
  [key]: value,
};

console.log(obj);*/

const orders = [
  { id: 1, product: "React Kit", amount: 49, status: "completed" },
  { id: 2, product: "Node API", amount: 29, status: "pending" },
  { id: 3, product: "CSS Bundle", amount: 19, status: "completed" },
  { id: 4, product: "TS Guide", amount: 35, status: "refunded" },
  { id: 5, product: "Docker Kit", amount: 45, status: "completed" },
];

const completedOrders = orders.filter((o) => o.status === "completed");
console.log(completedOrders);

const completedTotal = completedOrders.reduce(
  (total, order) => total + order.amount,
  0,
);

console.log(completedTotal);

const nonCompletedOrders = orders.filter(
  (o) => o.status === "refunded" || o.status === "pending",
);

console.log(nonCompletedOrders);

const nonCompletedProductNames = nonCompletedOrders.map((p) => p.product);
console.log(nonCompletedProductNames);

const id3Product = orders.find((p) => p.id === 3);
console.log(id3Product);

const { product, amount } = id3Product;
console.log(product, amount);

const ordersWithTax = orders.map((order) => ({
  ...order,
  tax: order.amount * 0.18,
}));
console.log("Orders with tax:", ordersWithTax);
