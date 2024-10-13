import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { useParams } from "react-router-dom";

export default function Track() {
  const { orderId } = useParams(); // Extract the order ID from the URL

  const gradientStyle = {
    background: "#f8f9fa",
    height: "100vh", // Full height for the page
  };

  const [statusValue, setStatusValue] = useState(0); // To hold the status value from the range slider
  const [statusText, setStatusText] = useState("Processing"); // Display status text

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusValue(value);

    // Update status text based on the slider value
    if (value <= 33) {
      setStatusText("Processing");
    } else if (value > 33 && value <= 66) {
      setStatusText("Out for delivery");
    } else {
      setStatusText("Delivered");
    }
  };

  const submitStatus = () => {
    // Here you would typically send the updated status to the backend
    alert(`Status updated to: ${statusText}`);
  };

  const downloadReport = () => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(20);
    doc.text("Order Tracking Report", 20, 20);

    // Add Order Details (customized based on orderId)
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderId}`, 20, 30);
    doc.text("Thanks for your Order, Anna!", 20, 40);
    doc.text("Receipt Voucher: 1KAU9-84UIL", 20, 50);
    doc.text("Total: $1040", 20, 60);
    doc.text("Invoice Number: 788152", 20, 70);
    doc.text("Invoice Date: 22 Dec, 2019", 20, 80);
    doc.text("Delivery Charges: Free", 20, 90);
    doc.text("Discount: $19.00", 20, 100);
    doc.text("GST: 18%", 20, 110);
    doc.text("Receipts Voucher: 18KU-62IIK", 20, 120);

    // Add Line Items
    doc.text("Order Details:", 20, 130);
    doc.text("Product: Samsung Galaxy - $499", 20, 140);
    doc.text("Product: iPad - $399", 20, 150);

    // Save the PDF
    doc.save("Order_Tracking_Report.pdf");
  };

  return (
    <div>
      <section style={{ ...gradientStyle }}>
        <div className="container py-5 h-100">
          <div className="row h-100 justify-content-center align-items-center">
            {/* Main Panel */}
            <div className="col-lg-10 col-xl-8">
              <div className="card" style={{ borderRadius: "10px" }}>
                <div className="card-header px-4 py-5">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-muted mb-0">
                      Tracking for Order ID: {orderId}
                    </h5>
                    <button className="btn btn-primary" onClick={downloadReport}>
                      Download Report
                    </button>
                  </div>
                </div>

                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    
                    <p className="small text-muted mb-0">Receipt Voucher: 1KAU9-84UIL</p>
                  </div>

                  <div className="card shadow-0 border mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-2">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.webp"
                            className="img-fluid"
                            alt="Phone"
                          />
                        </div>
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0">Samsung Galaxy</p>
                        </div>
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0 small">White</p>
                        </div>
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0 small">Capacity: 64GB</p>
                        </div>
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0 small">Qty: 1</p>
                        </div>
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0 small">$499</p>
                        </div>
                      </div>
                      <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: 1 }} />
                      <div className="row d-flex align-items-center">
                        <div className="col-md-2">
                          <p className="text-muted mb-0 small">Track Order</p>
                        </div>
                        <div className="col-md-10">
                          <input
                            type="range"
                            className="form-range"
                            min="0"
                            max="100"
                            value={statusValue}
                            onChange={handleStatusChange}
                          />
                          <div className="d-flex justify-content-around mb-1">
                            <p className="text-muted mt-1 mb-0 small">Processing</p>
                            <p className="text-muted mt-1 mb-0 small">Out for delivery</p>
                            <p className="text-muted mt-1 mb-0 small">Delivered</p>
                          </div>
                          <p className="fw-bold text-center mt-2">{statusText}</p>

                          <button className="btn btn-primary mt-3" onClick={submitStatus}>
                            Update Status
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between pt-2">
                    <p className="fw-bold mb-0">Order Details</p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Total</span> $898.00
                    </p>
                  </div>

                  <div className="d-flex justify-content-between pt-2">
                    <p className="text-muted mb-0">Invoice Number : 788152</p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Discount</span> $19.00
                    </p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p className="text-muted mb-0">Invoice Date : 22 Dec,2019</p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">GST 18%</span> 123
                    </p>
                  </div>

                  <div className="d-flex justify-content-between mb-5">
                    <p className="text-muted mb-0">Receipts Voucher : 18KU-62IIK</p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Delivery Charges</span> Free
                    </p>
                  </div>
                </div>

                <div
                  className="card-footer border-0 px-4 py-5"
                  style={{
                    backgroundColor: "#7fb3f0",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                    Total paid: <span className="h2 mb-0 ms-2">$1040</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
