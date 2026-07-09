import { useEffect, useState } from "react";

// Outside component — static helper function
const getBreakpoint = (width) => {
  if (width < 640) return { label: "Mobile", emoji: "📱" };
  if (width < 1024) return { label: "Tablet", emoji: "📟" };
  return { label: "Desktop", emoji: "💻" };
};

const Effects = () => {
  
  const [count, setCount] = useState(0);

  const [time, setTime] = useState("");

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productError, setProductError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=6",
        );
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setProductError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  
  useEffect(() => {
    const results = products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFiltered(results);
  }, [searchTerm, products]);

  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-50 p-8
                    space-y-8 max-w-4xl mx-auto"
    >
      
      <div
        className="bg-white rounded-xl border border-gray-100
                      shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Counter — watch the tab title change
        </h2>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCount(count - 1)}
            className="bg-gray-200 hover:bg-gray-300 font-bold
                       px-4 py-2 rounded-lg transition-colors"
          >
            −
          </button>
          <span className="text-3xl font-bold w-12 text-center">{count}</span>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white
                       font-bold px-4 py-2 rounded-lg transition-colors"
          >
            +
          </button>
        </div>
      </div>

     
      <div
        className="bg-white rounded-xl border border-gray-100
                      shadow-sm p-6 text-center"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Clock</h2>
        <p className="text-6xl font-mono font-bold text-indigo-600">
          {time || "Loading..."}
        </p>
      </div>

     
      <div
        className="bg-white rounded-xl border border-gray-100
                      shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Products</h2>

        {isLoading ? (
          <p className="text-gray-400 text-center py-8">Loading products...</p>
        ) : productError ? (
          <p className="text-red-500 text-center py-8">{productError}</p>
        ) : (
          <>
            
            <div className="mb-4 space-y-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full border border-gray-300 rounded-lg
                           px-4 py-2.5 text-sm focus:outline-none
                           focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-sm text-gray-500">
                Showing {filtered.length} of {products.length} products
              </p>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="border border-gray-100 rounded-xl
                                p-4 flex flex-col gap-2"
                >
                  <span
                    className="bg-indigo-100 text-indigo-700
                                   text-xs font-medium px-2 py-0.5
                                   rounded-full self-start"
                  >
                    {p.category}
                  </span>
                  <p
                    className="text-sm font-medium text-gray-900
                                leading-snug"
                  >
                    {p.title}
                  </p>
                  <p className="text-indigo-600 font-bold">${p.price}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>


      <div
        className="bg-white rounded-xl border border-gray-100
                      shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Window Size Tracker
        </h2>
        <div className="flex gap-6 mb-4">
          <div className="bg-gray-50 rounded-lg px-6 py-4 text-center">
            <p className="text-3xl font-bold text-indigo-600">
              {windowSize.width}px
            </p>
            <p className="text-xs text-gray-500 mt-1">Width</p>
          </div>
          <div className="bg-gray-50 rounded-lg px-6 py-4 text-center">
            <p className="text-3xl font-bold text-indigo-600">
              {windowSize.height}px
            </p>
            <p className="text-xs text-gray-500 mt-1">Height</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">
            {getBreakpoint(windowSize.width).emoji}
          </span>
          <span className="text-lg font-semibold text-gray-900">
            {getBreakpoint(windowSize.width).label}
          </span>
          <div className="ml-4 flex gap-1">
            <div
              className={`h-2 w-8 rounded-full ${
                windowSize.width < 640 ? "bg-indigo-500" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-2 w-8 rounded-full ${
                windowSize.width >= 640 && windowSize.width < 1024
                  ? "bg-indigo-500"
                  : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-2 w-8 rounded-full ${
                windowSize.width >= 1024 ? "bg-indigo-500" : "bg-gray-200"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Effects;
