"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save to localStorage

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to Cart

  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item._id === product._id);

      if (existingProduct) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove product from cart

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // Update quantity

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    setCart((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item)),
    );
  };


  // Total price

  const totalPrice = cart.reduce((acc , item) => acc + item.price * item.quantity , 0)

  // Clear Cart

  const clearCart = () => setCart([])

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);



  return (
    <CartContext.Provider
      value={{
        addToCart,
        isCartOpen,
        openCart,
        closeCart,
        cart,
        removeFromCart,
        updateQuantity,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook

export const useCart = () => useContext(CartContext);
