import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Practice from "./pages/Practice";
import Effects from "./pages/Effects";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";

const Button = ({ label, variant = "primary", onClick }) => {
  const variantStyles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
  };

  return (
    <button
      onClick={onClick}
      className={`${variantStyles[variant]} font-semibold 
                  px-6 py-2.5 rounded-lg transition-colors`}
    >
      {label}
    </button>
  );
};

const Badge = ({ text, color = "indigo" }) => {
  const colorStyles = {
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
    blue: "bg-blue-100 text-blue-700",
    indigo: "bg-indigo-100 text-indigo-700",
  };
  return (
    <span
      className={`${colorStyles[color]} text-xs font-medium px-2.5 py-0.5 rounded-full `}
    >
      {text}
    </span>
  );
};

const Card = ({ title, description, badge }) => {
  return (
    <div className="bg-white px-4 py-6 rounded-3xl shadow-lg mb-3">
      {badge && (
        <div className="mb-3">
          <Badge text={badge} color="indigo" />
        </div>
      )}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
};

const StatCard = ({ label, value, change, positive }) => {
  const changeColor = positive ? "text-green-600" : "text-red-500";
  const arrow = positive ? "↑" : "↓";

  return (
    <div
      className="bg-white rounded-xl border border-gray-100
                    shadow-sm p-6"
    >
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p
        className={`text-sm font-medium flex items-center 
                     gap-1 ${changeColor}`}
      >
        <span>{arrow}</span>
        <span>{change}</span>
        <span className="text-gray-400 font-normal ml-1">from last month</span>
      </p>
    </div>
  );
};

const ProductCard = ({ name, price, category, rating, inStock }) => {
  // Build star array
  // Creates [0, 1, 2, 3, 4]
  // _ = the value (unused, so we name it _)
  // i = the index (0, 1, 2, 3, 4)
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < Math.round(rating) ? "★" : "☆",
  );

  return (
    <div
      className="bg-white rounded-xl border border-gray-100
                    shadow-sm p-6 flex flex-col gap-3 max-w-xs"
    >
      {/* Category badge */}
      <div>
        <Badge text={category} color="indigo" />
      </div>

      {/* Product name */}
      <h3
        className="text-base font-semibold text-gray-900 
                     leading-snug"
      >
        {name}
      </h3>

      {/* Star rating */}
      <div className="flex items-center gap-2">
        <span className="text-yellow-400 text-sm tracking-wide">
          {stars.join("")}
        </span>
        <span className="text-gray-400 text-xs font-medium">{rating}</span>
      </div>

      {/* Price + stock */}
      <div className="flex items-center justify-between mt-1">
        <span className="text-xl font-bold text-indigo-600">${price}</span>
        {inStock ? (
          <Badge text="In Stock" color="green" />
        ) : (
          <Badge text="Out of Stock" color="red" />
        )}
      </div>
    </div>
  );
};

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
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exists = cart.some((item) => item.id === product.id);
    if (exists) return;
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };
  const clearCart = () => setCart([]);

  return (
    <>
      <Navbar cartCount={cart.length}></Navbar>
      <div className="min-h-screen bg-gray-50 p-8 space-y-6">
        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            label="Get Started"
            variant="primary"
            onClick={() => console.log("clicked")}
          />
          <Button
            label="Learn More"
            variant="secondary"
            onClick={() => console.log("clicked")}
          />
        </div>

        {/* Badges */}
        <div className="flex gap-3">
          <Badge text="Success" color="green" />
          <Badge text="Error" color="red" />
          <Badge text="Warning" color="yellow" />
          <Badge text="Info" color="blue" />
          <Badge text="New" color="indigo" />
        </div>
        <div className="flex gap-6 flex-wrap">
          {/* Card with badge */}
          <Card
            title="React Dashboard"
            description="A professional analytics dashboard built with React and Tailwind CSS."
            badge="New"
          />

          {/* Card with different badge */}
          <Card
            title="TypeScript Handbook"
            description="Everything you need to know about TypeScript for real projects."
            badge="Popular"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Revenue"
            value="$48,295"
            change="+12%"
            positive={true}
          />
          <StatCard
            label="Total Orders"
            value="1,429"
            change="+8%"
            positive={true}
          />
          <StatCard
            label="Refund Rate"
            value="2.4%"
            change="+0.8%"
            positive={false}
          />
          <StatCard
            label="Active Users"
            value="3,842"
            change="-3%"
            positive={false}
          />
        </div>
        <div className="flex gap-6 flex-wrap">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
      <Practice></Practice>
      <Effects></Effects>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route
          path="/products/:id"
          element={<ProductDetail cart={cart} addToCart={addToCart} />}
        ></Route>
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
