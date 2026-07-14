import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);

  const {
    data: products,
    isLoading,
    error,
  } = useFetch("https://fakestoreapi.com/products?limit=8");

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const results = products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFiltered(results);
  }, [debouncedSearch, products]);

  const { isDark } = useTheme();
  if (isLoading)
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center
                    justify-center"
      >
        <p className="text-gray-400 text-lg animate-pulse">
          Loading products...
        </p>
      </div>
    );

  if (error)
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center
                    justify-center"
      >
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Products</h1>
          <p className="text-gray-500">{products.length} products available</p>
        </div>
        {/* Search */}
        <div className="mb-6 space-y-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className={`w-full border border-gray-300 rounded-xl
               px-4 py-3 text-sm focus:outline-none
               focus:ring-2 focus:ring-indigo-500
             ${isDark ? "text-white bg-gray-900" : "text-gray-900 bg-white"}`}
          />
          <p className="text-sm text-gray-500">
            Showing {filtered.length} of {products.length} products
          </p>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2
                        lg:grid-cols-4 gap-6"
        >
          {filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              className="bg-white rounded-xl border border-gray-100
                         shadow-sm p-4 flex flex-col gap-3
                         cursor-pointer hover:shadow-md
                         transition-shadow"
            >
              <div
                className="bg-gray-50 rounded-lg p-4 flex
                              items-center justify-center h-48"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full object-contain"
                />
              </div>
              <span
                className="bg-indigo-100 text-indigo-700
                               text-xs font-medium px-2 py-0.5
                               rounded-full self-start capitalize"
              >
                {product.category}
              </span>
              <p
                className="text-sm font-semibold text-gray-900
                            leading-snug line-clamp-2 flex-1"
              >
                {product.title}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">
                  {"★".repeat(Math.round(product.rating.rate))}
                  {"☆".repeat(5 - Math.round(product.rating.rate))}
                </span>
                <span className="text-xs text-gray-400">
                  ({product.rating.count})
                </span>
              </div>
              <p className="text-lg font-bold text-indigo-600">
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
