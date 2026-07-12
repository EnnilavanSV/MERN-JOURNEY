import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=8",
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Products</h1>
          <p className="text-gray-500">{products.length} products available</p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2
                        lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
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
