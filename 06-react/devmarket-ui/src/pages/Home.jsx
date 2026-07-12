import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleProductPage = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen max-w-4xl text-center mx-auto px-4 py-6">
      <h1 className="text-3xl text-gray-500 mb-6">Welcome to Dev Market....</h1>
      <button
        onClick={handleProductPage}
        className="bg-indigo-500 border border-black text-white rounded-full px-4 py-2 hover:bg-indigo-700"
      >
        Browse Products
      </button>
    </div>
  );
};

export default Home;
