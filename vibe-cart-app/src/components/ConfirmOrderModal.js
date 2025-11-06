import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const overlay = {
    position: "fixed", inset: 0, background: "#0e0e1555", zIndex: 999,
    display: "flex", alignItems: "center", justifyContent: "center"
};
const modal = {
    minWidth: 450, minHeight: 340, background: "#fff",
    padding: "34px 40px 32px 40px", borderRadius: 13,
    boxShadow: "0 4px 26px #15153b38",
    display: "flex", flexDirection: "column", position: "relative", maxWidth: "94vw"
};
export default function ConfirmOrderModal({ open, order, onClose }) {
    if (!open || !order) return null;
    return (
        <div style={overlay}>
            <div style={modal}>
                <button onClick={onClose}
                    style={{
                        position: "absolute", top: 16, right: 26, border: "none", background: "none",
                        fontSize: "2rem", color: "#444", cursor: "pointer"
                    }}>×</button>
                <div style={{
                    display: "flex", alignItems: "center", gap: 9,
                }}>
                    <FaCheckCircle size={28} color="#21bb52" style={{ marginRight: 10 }} />
                    <h3 style={{ fontSize: "1.37rem", fontWeight: "bold", margin: 0 }}>Order Confirmed!</h3>
                </div>
                <div style={{ fontSize: "1rem", margin: "7px 0 19px 0", color: "#555" }}>
                    Your order has been successfully placed and is being processed.
                </div>
                <div style={{
                    background: "#fafafe", borderRadius: 8, border: "1px solid #edeaf8",
                    padding: "13px 17px", margin: "10px 0"
                }}>
                    <div style={{
                        display: "flex", justifyContent: "space-between", fontSize: "1.01rem", marginBottom: 6
                    }}>
                        <span>Order ID:</span>
                        <span>{order.orderId}</span>
                    </div>
                    <div style={{
                        display: "flex", justifyContent: "space-between", fontSize: "1.01rem", marginBottom: 6
                    }}>
                        <span>Date:</span>
                        <span>{order.date}</span>
                    </div>
                    <div style={{
                        display: "flex", justifyContent: "space-between", fontSize: "1.01rem", marginBottom: 6
                    }}>
                        <span>Customer:</span>
                        <span>{order.customer}</span>
                    </div>
                    <div style={{
                        display: "flex", justifyContent: "space-between", fontSize: "1.01rem", marginBottom: 3
                    }}>
                        <span>Email:</span>
                        <span>{order.email}</span>
                    </div>
                </div>
                <div style={{
                    background: "#fafafe", borderRadius: 8, border: "1px solid #edeaf8",
                    padding: "13px 17px", margin: "10px 0"
                }}>
                    <div style={{
                        fontSize: "1.07rem", fontWeight: 700, marginBottom: 4
                    }}>Order Items</div>
                    {order.items.map(item => (
                        <div key={item.id} style={{
                            display: "flex", justifyContent: "space-between",
                            fontSize: "1rem", paddingBottom: 3
                        }}>
                            <span>{item.name} × {item.qty}</span>
                            <span>${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div style={{
                    background: "#fafafe", borderRadius: 8, border: "1px solid #edeaf8",
                    padding: "13px 17px", margin: "10px 0"
                }}>
                    <div style={{
                        display: "flex", justifyContent: "space-between",
                        fontSize: "1.14rem", fontWeight: 700
                    }}>
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>
                </div>
                <button onClick={onClose}
                    style={{
                        marginTop: 20, background: "#0a0a19", color: "#fff", border: "none",
                        borderRadius: 7, fontSize: "1.13rem", padding: "11px 4px",
                        fontWeight: "bold", cursor: "pointer", transition: "background .14s"
                    }}>
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}