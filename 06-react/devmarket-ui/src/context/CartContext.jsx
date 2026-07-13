import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
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

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const cartCount = cart.length;

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    total,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
