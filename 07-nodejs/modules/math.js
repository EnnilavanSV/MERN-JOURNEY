const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

// percentage(200, 18) → 36 (18% of 200)
const percentage = (value, percent) => {
  return (value * percent) / 100;
};

module.exports = { add, subtract, multiply, percentage };
