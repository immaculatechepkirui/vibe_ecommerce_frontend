import React, { useEffect, useState } from "react";
import { fetchProducts } from "./utils/api";
import { CartProvider, useCart } from "./hooks/useCart";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import CartModal from "./components/CartModal";
import ConfirmOrderModal from "./components/ConfirmOrderModal";

function AppContent() {
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleOpenCart = () => setCartOpen(true);
  const handleCloseCart = () => setCartOpen(false);
  const handleOrderConfirmed = (orderData) => {
    setOrder(orderData);
    setConfirmOpen(true);
    setCartOpen(false);
  };
  const handleContinueShopping = () => setConfirmOpen(false);

  return (
    <div style={{ minHeight: "100vh", background: "#f6f7f9" }}>
      <Header onCartClick={handleOpenCart} cartCount={cart.length} />
      <main>
        <h2 style={{
          fontSize: "2rem", fontWeight: 700,
          margin: "32px 0 0 48px"
        }}>Featured Products</h2>
        <p style={{
          fontSize: "1rem", fontWeight: 400, color: "#757575",
          margin: "4px 0 32px 48px"
        }}>Discover our curated selection of quality items</p>
        <ProductGrid products={products} />
      </main>
      <CartModal
        open={cartOpen}
        onClose={handleCloseCart}
        onOrderComplete={handleOrderConfirmed}
      />
      <ConfirmOrderModal
        open={confirmOpen}
        order={order}
        onClose={handleContinueShopping}
      />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;