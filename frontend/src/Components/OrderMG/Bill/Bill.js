import React, { useState } from "react";

export default function Bill() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    email: "",
    phone: "",
    orderNotes: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/save-billing-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Billing details saved successfully!");
        setIsSuccess(true);
      } else {
        alert("Failed to save billing details.");
      }
    } catch (error) {
      console.error("Error saving billing details:", error);
    }
  };

  const handlePurchase = () => {
    if (isSuccess) {
      alert("Thank you for your purchase!");
    } else {
      alert("Please save billing details first.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 mb-4"> {/* Reduced size */}
          <div className="card mb-4">
            <div className="card-header py-3">
              <h5 className="mb-0">Billing Details</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                  <div className="col">
                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label" htmlFor="firstName">
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label" htmlFor="lastName">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="city">Town/City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="orderNotes">Order Notes (Optional)</label>
                  <textarea
                    className="form-control"
                    id="orderNotes"
                    name="orderNotes"
                    rows="4"
                    value={formData.orderNotes}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-sm btn-block">
                  Save Billing Details
                </button>
              </form>
              {isSuccess && <div className="alert alert-success mt-4">Billing details saved successfully!</div>}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4"> {/* Reduced size */}
          <div className="card mb-4">
            <div className="card-header py-3">
              <h5 className="mb-0">Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products
                  <span>$53.98</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>Gratis</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                  </div>
                  <span><strong>$53.98</strong></span>
                </li>
              </ul>

              <button
                type="button"
                className="btn btn-primary btn-sm btn-block"
                onClick={handlePurchase}
              >
                Make Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
