import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const styles = {
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    background: "#fff", padding: "16px 32px 14px 32px",
    borderBottom: "1px solid #e3e3eb", zIndex: 2, position: "sticky", top: 0
  },
  logo: {
    fontSize: "1.2rem", letterSpacing: "-1px", color: "#1a237e",
    display: "flex", alignItems: "center"
  },
  cartBtn: {
    background: "none", border: "none", position: "relative",
    cursor: "pointer", padding: "6px 13px", borderRadius: 24, transition: "background .2s"
  },
  cartBadge: {
    background: "#12123d", color: "#fff", fontSize: "0.86rem", fontWeight: 700,
    lineHeight: "20px", padding: "2px 8px", borderRadius: 999,
    position: "absolute", right: 2, top: -6, minWidth: 22, display: "flex",
    alignItems: "center", justifyContent: "center"
  }
};

export default function Header({ onCartClick, cartCount }) {
  return (
    <header style={styles.header}>
      <div>
        <span style={styles.logo}>
          <span role="img" aria-label="store">🏬 </span>
          <b>Vibe Commerce</b>
        </span>
      </div>
      <div style={{ position: "relative" }}>
        <button style={styles.cartBtn} onClick={onCartClick}>
          <FaShoppingCart size={24} />
          {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}