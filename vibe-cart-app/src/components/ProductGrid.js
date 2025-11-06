import React from "react";
import { useCart } from "../hooks/useCart";
import { FaCartPlus } from "react-icons/fa";

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
    gap: "36px 24px",
    padding: "18px 48px 32px 48px"
};
const cardStyle = {
    background: "#fff", borderRadius: 13, border: "1px solid #e3e3eb",
    boxShadow: "0 1px 5px #00000009", padding: "0 0 18px 0",
    position: "relative", display: "flex", flexDirection: "column",
    alignItems: "flex-start", transition: "box-shadow 0.17s"
};

export default function ProductGrid({ products }) {
    const { addToCart, cart } = useCart();
    return (
        <div style={gridStyle}>
            {products.map((p) => {
                const inCart = cart.some((item) => item.id === p.id);
                return (
                    <div key={p.id} style={{
                        ...cardStyle,
                        boxShadow: inCart ? "0 2px 12px #18181825" : cardStyle.boxShadow,
                        borderColor: inCart ? "#0a0a19" : "#e3e3eb",
                    }}>
                        <div style={{
                            width: "100%", height: 170, overflow: "hidden",
                            borderRadius: "11px 11px 0 0", marginBottom: 6, background: "#fafbfc"
                        }}>
                            <img src={p.image}
                                alt={p.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </div>
                        <span style={{
                            fontSize: "0.9rem", color: "#afafc3", marginLeft: 16, marginTop: 6,
                            fontWeight: 600, letterSpacing: ".05em"
                        }}>{p.category?.toUpperCase()}</span>
                        <span style={{
                            fontSize: "1.13rem", color: "#1b1b1d", marginLeft: 16,
                            fontWeight: 600, marginTop: 3
                        }}>{p.name}</span>
                        <span style={{
                            fontWeight: 700, color: "#0a0a19", fontSize: "1rem",
                            margin: "10px 0 8px 16px"
                        }}>
                            ${p.price.toFixed(2)}
                        </span>
                        <button
                            style={{
                                marginLeft: 16,
                                marginTop: 3,
                                background: inCart ? "#3e4495" : "#0a0a19",
                                color: "#fff",
                                border: "none",
                                borderRadius: 7,
                                fontWeight: 700,
                                display: "flex",
                                alignItems: "center",
                                padding: "6px 18px",
                                fontSize: "1rem",
                                cursor: inCart ? "not-allowed" : "pointer",
                                transition: "background .12s"
                            }}
                            disabled={inCart}
                            onClick={() => addToCart(p)}
                        >
                            <FaCartPlus style={{ marginRight: 6 }} />
                            {inCart ? "Added" : "Add"}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}