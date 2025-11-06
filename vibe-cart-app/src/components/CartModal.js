import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";

const overlayStyle = {
  position: "fixed", inset: 0, background: "#13141839", zIndex: 50,
  display: "flex", justifyContent: "flex-end"
};
const modalStyle = {
  width: 470, background: "#fff", minHeight: "100vh", padding: "28px 28px 32px 28px",
  boxShadow: "-8px 0 18px #13141828", display: "flex", flexDirection: "column",
  position: "relative"
};

export default function CartModal({ open, onClose, onOrderComplete }) {
  const { cart, updateCartItem, removeFromCart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (!open) return null;

  const handleQty = (id, delta) => updateCartItem(id, delta);
  const handleRemove = (id) => removeFromCart(id);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    await new Promise(res => setTimeout(res, 900));
    const orderId = "ORDER-" + Date.now(), now = new Date();
    onOrderComplete({
      orderId,
      date: now.toLocaleString(),
      customer: name,
      email,
      items: cart.map(i => ({ ...i })),
      total,
    });
    clearCart();
    setName("");
    setEmail("");
    setSubmitting(false);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 19, right: 24, border: "none",
            background: "none", fontSize: "2rem", color: "#444", cursor: "pointer"
          }}>×</button>
        <h2 style={{ fontSize: "1.35rem", fontWeight: "bold", margin: 0, marginBottom: 18 }}>Shopping Cart</h2>
        {cart.length === 0 ? (
          <div style={{ padding: "34px 0", color: "#aaa" }}>Your cart is empty.</div>
        ) : (
          <div style={{
            borderBottom: "1px solid #e3e3eb", marginBottom: 18, paddingBottom: 18
          }}>
            {cart.map(item => (
              <div key={item.id} style={{
                display: "flex", alignItems: "center", padding: "12px 0", gap: 16,
                borderBottom: "1px solid #eee8"
              }}>
                <img src={item.image} alt={item.name}
                  style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 8, background: "#f4f4f6" }} />
                <div style={{ flex: "1 1 110px" }}>
                  <div style={{ fontWeight: 600, fontSize: "1.09rem" }}>{item.name}</div>
                  <div style={{ color: "#686887", fontSize: "0.93rem" }}>${item.price.toFixed(2)}</div>
                  <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 11 }}>
                    <button
                      onClick={() => handleQty(item.id, -1)}
                      disabled={item.qty <= 1}
                      style={{
                        width: 28, height: 28, fontSize: "1.6rem",
                        background: "#f4f4fa", border: "none", borderRadius: 6,
                        cursor: "pointer", color: "#222", transition: "background .1s"
                      }}>–</button>
                    <span style={{ fontWeight: 600, fontSize: "1.12rem" }}>{item.qty}</span>
                    <button
                      onClick={() => handleQty(item.id, 1)}
                      style={{
                        width: 28, height: 28, fontSize: "1.6rem",
                        background: "#f4f4fa", border: "none", borderRadius: 6,
                        cursor: "pointer", color: "#222", transition: "background .1s"
                      }}>+</button>
                  </div>
                </div>
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "flex-end",
                  gap: 12, minWidth: 84
                }}>
                  <span style={{ fontWeight: "bold", color: "#0a0a19", fontSize: "1.05rem" }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                  <button
                    style={{
                      background: "none", border: "none", color: "#d32f2f",
                      fontSize: "1.1rem", cursor: "pointer"
                    }}
                    onClick={() => handleRemove(item.id)}
                    title="Remove"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Checkout */}
        <form style={{
          display: "flex", flexDirection: "column", gap: 12, marginTop: 10
        }} onSubmit={handleCheckout}>
          <div style={{ fontSize: "1.07rem", fontWeight: 600, marginBottom: 2 }}>Checkout</div>
          <input
            type="text" placeholder="Full Name" value={name}
            onChange={e => setName(e.target.value)}
            style={{
              padding: "9px 11px", border: "1.3px solid #e3e3eb", borderRadius: 7,
              background: "#f7f7fc", fontSize: "1rem", marginTop: 0
            }}
            required
          />
          <input
            type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: "9px 11px", border: "1.3px solid #e3e3eb", borderRadius: 7,
              background: "#f7f7fc", fontSize: "1rem"
            }}
            required
          />
          <div style={{
            display: "flex", justifyContent: "space-between",
            fontSize: "1.05rem", fontWeight: 700, margin: "10px 0 8px 0"
          }}>
            <span>Total</span>
            <span style={{ color: "#0a0a19" }}>${total.toFixed(2)}</span>
          </div>
          <button
            style={{
              background: "#0a0a19", color: "#fff", border: "none", borderRadius: 7,
              fontSize: "1.17rem", padding: "10px 3px",
              fontWeight: "bold", marginTop: 2, cursor: "pointer", transition: "background .13s",
              ...(submitting || !name || !email || !cart.length
                ? { background: "#bbb", cursor: "not-allowed" }
                : {}),
            }}
            disabled={!name || !email || !cart.length || submitting}>
            {submitting ? "Processing..." : "Complete Order"}
          </button>
        </form>
      </div>
    </div>
  );
}