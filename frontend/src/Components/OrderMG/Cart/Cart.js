import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Phone",
      size: "50ml",
      price: 5250,
      quantity: 1,
      image:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp",
    },
  ]);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleIncreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    navigate("/bill"); // Navigate to the bill page when checkout button is clicked
  };

  return (
    <section style={{ backgroundColor: "#fff", height: "100%" }}>
      <div style={{ padding: "60px", height: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div style={{ maxWidth: "1000px", width: "100%" }}>
            <div style={{ border: "none" }}>
              <div style={{ padding: "40px" }}>
                <h1 style={{ marginBottom: "40px", fontSize: "2.5rem" }}>Cart</h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "1.25rem" }}>Product</p>
                  <p style={{ fontWeight: "bold", fontSize: "1.25rem" }}>Price</p>
                  <p style={{ fontWeight: "bold", fontSize: "1.25rem" }}>Quantity</p>
                  <p style={{ fontWeight: "bold", fontSize: "1.25rem" }}>Total</p>
                </div>
                <hr style={{ marginBottom: "40px" }} />

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "40px",
                    }}
                  >
                    {/* Product column */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "90px",
                          borderRadius: "5px",
                          marginBottom: "10px",
                        }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <h5 style={{ fontSize: "1.1rem", marginBottom: "5px" }}>
                          {item.name}
                        </h5>
                        <p style={{ fontSize: "small", color: "#888" }}>
                          Size: {item.size}
                        </p>
                      </div>
                    </div>

                    {/* Price column */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ fontWeight: "normal", fontSize: "1.1rem" }}>
                        Rs {item.price}
                      </p>
                    </div>

                    {/* Quantity column */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <button
                          style={{
                            border: "1px solid #ced4da",
                            padding: "5px 20px",
                          }}
                          onClick={() => handleDecreaseQuantity(item.id)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          style={{
                            textAlign: "center",
                            width: "50px",
                            border: "1px solid #ced4da",
                            margin: "0 20px",
                          }}
                          readOnly
                        />
                        <button
                          style={{
                            border: "1px solid #ced4da",
                            padding: "5px 20px",
                          }}
                          onClick={() => handleIncreaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total column */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                      }}
                    >
                      <p style={{ fontWeight: "normal", fontSize: "1.1rem" }}>
                        Rs {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove button */}
                    <button
                      style={{
                        color: "#cecece",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      🗑
                    </button>
                  </div>
                ))}

                <hr style={{ marginBottom: "40px" }} />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "40px",
                  }}
                >
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <p style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                        Subtotal
                      </p>
                      <p style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                        Rs {calculateTotal()} LKR
                      </p>
                    </div>
                    <p style={{ fontSize: "small", color: "#888" }}>
                      Taxes and shipping calculated at checkout
                    </p>
                    <button
                      style={{
                        backgroundColor: " #252B42",
                        color: "white",
                        padding: "15px 30px",
                        fontSize: "1.2rem",
                        textTransform: "uppercase",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={handleCheckout} 
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
