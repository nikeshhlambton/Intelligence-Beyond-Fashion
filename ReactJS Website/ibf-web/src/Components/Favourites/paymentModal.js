import React from "react";
import "./payment.css";

// PaymentModal component for displaying the payment gateway
const PaymentModal = ({ trend }) => {
  // Constants for calculating tax and final price
  const tax = 0.2;
  const price = parseFloat(trend?.price?.replace(/\$/g, ""));
  const taxAmount = price * tax;
  const finalPrice = price + taxAmount;

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" style={{ maxWidth: "65%" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Payment Gateway</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container d-lg-flex">
              {/* Left side - User and product details */}
              <div className="box-1 bg-light user">
                <div className="box-inner-1 pb-3 mb-3 ">
                  <div className="d-flex justify-content-between mb-3 userdetails">
                    <p className="fw-bold">{trend?.label}</p>
                    <p className="fw-lighter">
                      <span className="fas"></span>
                      {trend.price}
                    </p>
                  </div>
                  <p className="dis info my-3">{trend.title}</p>
                  <img
                    className="payment_image"
                    src={trend.img}
                    alt="paymentImage"
                  />
                </div>
              </div>
              {/* Right side - Payment details form */}
              <div className="box-2">
                <div className="box-inner-2">
                  <div>
                    <p className="fw-bold">Payment Details</p>
                    <p className="dis mb-3">
                      Complete your purchase by providing your payment details
                    </p>
                  </div>
                  <form action="">
                    {/* Email address input */}
                    <div className="mb-3">
                      <p className="dis fw-bold mb-2">Email address</p>
                      <input className="form-control" type="email" />
                    </div>
                    {/* Card details inputs */}
                    <div>
                      <p className="dis fw-bold mb-2">Card details</p>
                      <div className="d-flex align-items-center justify-content-between card-atm border rounded">
                        <div className="fab fa-cc-visa ps-3"></div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Card Details"
                        />
                        <div className="d-flex w-50">
                          <input
                            type="text"
                            className="form-control px-0"
                            placeholder="MM/YY"
                          />
                          <input
                            type="password"
                            maxLength={3}
                            className="form-control px-0"
                            placeholder="CVV"
                          />
                        </div>
                      </div>
                      {/* Cardholder name input */}
                      <div className="my-3 cardname">
                        <p className="dis fw-bold mb-2">Cardholder name</p>
                        <input className="form-control" type="text" />
                      </div>
                      {/* Billing address inputs */}
                      <div className="address">
                        <p className="dis fw-bold mb-3">Billing address</p>
                        <select
                          className="form-select"
                          aria-label="Default select example
                          "
                        >
                          <option selected hidden>
                            United States
                          </option>
                          <option value="1">India</option>
                          <option value="2">Australia</option>
                          <option value="3">Canada</option>
                        </select>
                        <div className="d-flex">
                          <input
                            className="form-control zip"
                            type="text"
                            placeholder="ZIP"
                          />
                          <input
                            className="form-control state"
                            type="text"
                            placeholder="State"
                          />
                        </div>
                        {/* Price calculation summary */}
                        <div className="d-flex flex-column dis mt-4">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <p>Subtotal</p>
                            <p>
                              <span className="fas fa-dollar-sign"></span>
                              {price.toFixed(2)}
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <p>
                              VAT<span>(20%)</span>
                            </p>
                            <p>
                              <span className="fas fa-dollar-sign"></span>
                              {taxAmount.toFixed(2)}
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <p className="fw-bold">Total</p>
                            <p className="fw-bold">
                              <span className="fas fa-dollar-sign"></span>
                              {finalPrice.toFixed(2)}
                            </p>
                          </div>
                          {/* Pay button */}
                          <div className="btn custom_primary_color mt-2">
                            Pay<span className="fas fa-dollar-sign px-1"></span>
                            {finalPrice.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
