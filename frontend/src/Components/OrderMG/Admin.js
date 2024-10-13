import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to track search input

  useEffect(() => {
    const dummyOrders = [
      { id: 1, customerName: "John Doe", date: "2024-09-28", total: "$150.00", status: "Shipped" },
      { id: 2, customerName: "Jane Smith", date: "2024-09-27", total: "$75.00", status: "Processing" },
      { id: 3, customerName: "Bob Johnson", date: "2024-09-26", total: "$200.00", status: "Delivered" },
      { id: 4, customerName: "Alice Brown", date: "2024-09-25", total: "$50.00", status: "Pending" },
      { id: 5, customerName: "Tom Wilson", date: "2024-09-24", total: "$125.00", status: "Shipped" },
      { id: 6, customerName: "Lucy Green", date: "2024-09-23", total: "$300.00", status: "Processing" },
      { id: 7, customerName: "Michael White", date: "2024-09-22", total: "$85.00", status: "Delivered" },
      { id: 8, customerName: "Emma Black", date: "2024-09-21", total: "$60.00", status: "Canceled" },
    ];
    setOrders(dummyOrders);
  }, []);

  const handleDelete = (id) => {
    // Filter out the order with the matching ID
    const updatedOrders = orders.filter(order => order.id !== id);
    setOrders(updatedOrders);
  };

  // Filter orders by searchTerm
  const filteredOrders = orders.filter((order) =>
    order.id.toString().includes(searchTerm) // Convert ID to string and check if it contains searchTerm
  );

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "230px",
          minHeight: "100vh",
          backgroundColor: "#007bff",
          color: "white",
          padding: "20px",
        }}
      >
        <h5>Admin Panel</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              className="nav-link text-white"
              to="/dashboard"
              style={{ color: "white", textDecoration: "none" }}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-white"
              href="#orders"
              style={{ color: "white", textDecoration: "none" }}
            >
              Orders
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: "230px", padding: "20px", width: "calc(100% - 230px)" }}>
        <div className="container">
          <h3 style={{ color: "#007bff" }}>Order Management</h3>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by Order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as user types
            className="form-control mb-3"
            style={{ maxWidth: "300px" }}
          />

          <table className="table table-striped table-hover mt-4">
            <thead style={{ backgroundColor: "#007bff", color: "white" }}>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Order Date</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.date}</td>
                    <td>{order.total}</td>
                    <td>{order.status}</td>
                    <td>
                      {/* Update View button to use Link for navigation */}
                      <Link to={"/track"}>
                        <button
                          className="btn btn-sm btn-primary"
                          style={{ marginRight: "10px" }}
                        >
                          View
                        </button>
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(order.id)} // Call handleDelete with the order ID
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
