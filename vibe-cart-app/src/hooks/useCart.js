import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const val = localStorage.getItem("vibe-cart");
    if (val) setCart(JSON.parse(val));
  }, []);
  useEffect(() => {
    localStorage.setItem("vibe-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((cart) => {
      if (cart.some((item) => item.id === product.id)) return cart;
      return [...cart, { ...product, qty: 1 }];
    });
  };
  const updateCartItem = (id, delta) => {
    setCart((cart) =>
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };
  const removeFromCart = (id) => {
    setCart((cart) => cart.filter((item) => item.id !== id));
  };
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}