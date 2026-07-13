import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

const getStars = (rating) => {
  const rounded = Math.round(rating);
  return Array.from({ length: 5 }, (_, i) => (i < rounded ? "★" : "☆")).join(
    "",
  );
};

const ProductDetail = () => {
  const { cart, addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const isInCart = cart.some((item) => item.id === product?.id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading)
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center
                    justify-center"
      >
        <p className="text-gray-400 text-lg animate-pulse">
          Loading product...
        </p>
      </div>
    );

  if (error)
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center
                    justify-center flex-col gap-4"
      >
        <p className="text-red-500 text-lg">{error}</p>
        <Link
          to="/products"
          className="text-indigo-600 hover:underline text-sm"
        >
          ← Back to Products
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Link
          to="/products"
          className="text-indigo-600 hover:text-indigo-700
                     text-sm font-medium flex items-center gap-1
                     transition-colors"
        >
          ← Back to Products
        </Link>
      </div>

      {/* Product layout */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div
          className="bg-white rounded-2xl border border-gray-100
                        shadow-sm p-8 grid grid-cols-1 md:grid-cols-2
                        gap-8"
        >
          {/* LEFT — Image */}
          <div
            className="flex items-center justify-center
                          bg-gray-50 rounded-xl p-8"
          >
            <img
              src={product.image}
              alt={product.title}
              className="max-h-72 object-contain"
            />
          </div>

          {/* RIGHT — Details */}
          <div className="flex flex-col gap-4">
            {/* Category badge */}
            <span
              className="bg-indigo-100 text-indigo-700
                             text-xs font-medium px-2.5 py-1
                             rounded-full self-start capitalize"
            >
              {product.category}
            </span>

            {/* Title */}
            <h1
              className="text-2xl font-bold text-gray-900
                           leading-snug"
            >
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">
                {getStars(product.rating.rate)}
              </span>
              <span className="text-sm text-gray-500">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-indigo-600">
              ${product.price}
            </p>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => addToCart(product)}
                disabled={isInCart}
                className={`flex-1 font-semibold py-3 rounded-xl
                transition-colors
                ${
                  isInCart
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {isInCart ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <button
                onClick={() => navigate("/products")}
                className="border-2 border-gray-200 hover:border-gray-300
                           text-gray-700 font-semibold px-6 py-3
                           rounded-xl transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
