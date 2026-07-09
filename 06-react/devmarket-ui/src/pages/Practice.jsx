import { useState } from "react";

const initialProducts = [
  { id: 1, name: "React Dashboard", price: 49 },
  { id: 2, name: "Node API Kit", price: 29 },
  { id: 3, name: "Tailwind UI Kit", price: 19 },
  { id: 4, name: "TypeScript Guide", price: 35 },
];

const Practice = () => {
  const [count, setCount] = useState(0);
  const [countError, setCountError] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillsInput, setSkillsInput] = useState("");
  const [error, setError] = useState("");

  const [cart, setCart] = useState([]);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreseCount = () => {
    if (count === 0) {
      setCountError("Can't go below 0");
      return;
    }
    setCountError("");
    setCount(count - 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  const getColourClass = (value) => {
    if (value > 5) return "bg-green-500";
    if (value >= 1 && value <= 5) return "bg-yellow-500";
    return "bg-gray-500";
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setFormError("Please fill in all fields");
      return;
    }

    setFormError("");
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleAddSkill = () => {
    const trimmed = skillsInput.trim();

    if (trimmed === "") return;

    const isDuplicate = skills.some(
      (s) => s.toLowerCase() === trimmed.toLowerCase(),
    );

    if (isDuplicate) {
      setError(`"${trimmed}" already exists`);
      return;
    }

    setSkills([...skills, trimmed]);
    setSkillsInput("");
    setError("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const isInCart = (productId) => cart.some((item) => item.id === productId);

  const addToCart = (product) => {
    if (isInCart(product.id)) return;
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      className={`min-h-screen p-8 space-y-12 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <h1 className="text-3xl font-bold text-black">useState Practice</h1>

      {/* Part 1 — Counter */}
      <h2>Counter</h2>
      <div className="flex justify-between items-center max-w-3xl bg-gray-300 px-6">
        <button onClick={increaseCount} className="px-6 bg-white text-black">
          +
        </button>
        <p className={`${getColourClass(count)} px-6`}>{count}</p>
        <button onClick={decreseCount} className="px-6 bg-white text-black">
          -
        </button>
      </div>
      {countError && <p className="text-red-500 text-sm mt-1">{countError}</p>}
      <div>
        <button onClick={resetCount} className="px-6 bg-gray-800 text-white">
          Clear
        </button>
      </div>
      {/* Part 2 — Toggle Theme */}
      <button
        onClick={toggleTheme}
        className={`px-8 py-6 ${isDark ? "bg-white text-gray-500" : "bg-gray-500 text-white"}`}
      >
        {isDark ? "switch to light " : "switch to dark"}
      </button>
      {/* Part 3 — Controlled Form */}
      <div className="bg-gray-500 max-w-4xl mx-auto px-4 py-6">
        {formError && <p className="text-red-500 text-sm mb-3">{formError}</p>}
        <form action="submit" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="mr-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="bg-white px-4"
            />
          </div>
          <div className="mb-4">
            <label className="mr-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white px-4"
            />
          </div>
          <div className="mb-4 a">
            <label className="mr-2">Message</label>
            <textarea
              rows={4}
              maxLength={200}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full py-2 px-2 border border-gray-300"
              required
            ></textarea>
          </div>
          <button className="bg-indigo-500 px-4 py-4 rounded-2xl">
            submit
          </button>
        </form>
      </div>

      {/* Preview the form */}
      <div className="bg-gray-500 max-w-3xl mx-auto px-4 py-2">
        <p>Name</p>
        <div className="text-white">{name}</div>
        <p>Email</p>
        <div className="text-white">{email}</div>
        <p>Message</p>
        <div className="text-white">{message}</div>
      </div>

      {/* Part 4 — Skills List */}
      <div
        className="bg-white rounded-xl border border-gray-100
                shadow-sm p-6 space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-900">Skills List</h2>

        {/* Input row */}
        <div className="flex gap-3">
          <input
            type="text"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
            placeholder="Enter a skill"
            className="flex-1 border border-gray-300 rounded-lg
                 px-4 py-2.5 text-sm focus:outline-none
                 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddSkill}
            className="bg-indigo-600 hover:bg-indigo-700 text-white
                 font-semibold px-5 py-2.5 rounded-lg
                 transition-colors text-sm"
          >
            Add
          </button>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Skills badges */}
        {skills.length === 0 ? (
          <p className="text-gray-400 text-sm">No skills added yet</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 text-sm
                     font-medium px-3 py-1 rounded-full
                     flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-indigo-400 hover:text-indigo-700
                       font-bold transition-colors leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Part 5 — Shopping Cart */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Shopping Cart
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT — Products */}
          <div>
            <h3
              className="text-sm font-semibold text-gray-500
                     uppercase tracking-wider mb-3"
            >
              Products
            </h3>
            <div className="space-y-3">
              {initialProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between
                       bg-white border border-gray-100
                       rounded-xl px-4 py-3 shadow-sm"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {product.name}
                    </p>
                    <p className="text-indigo-600 font-bold text-sm">
                      ${product.price}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={isInCart(product.id)}
                    className={`text-sm font-semibold px-4 py-2
                          rounded-lg transition-colors
                          ${
                            isInCart(product.id)
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white"
                          }`}
                  >
                    {isInCart(product.id) ? "Added ✓" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Cart */}
          <div>
            <h3
              className="text-sm font-semibold text-gray-500
                     uppercase tracking-wider mb-3"
            >
              Cart ({cart.length})
            </h3>
            <div
              className="bg-white border border-gray-100
                      rounded-xl shadow-sm p-4"
            >
              {cart.length === 0 ? (
                <p className="text-gray-400 text-sm py-4 text-center">
                  Your cart is empty
                </p>
              ) : (
                <>
                  <div className="space-y-2 mb-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between
                             py-2 border-b border-gray-100"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-indigo-600 font-bold">
                            ${item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-600
                               text-xs font-medium transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <div
                    className="flex justify-between items-center
                            pt-2 border-t border-gray-200"
                  >
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-indigo-600">
                      ${total}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
