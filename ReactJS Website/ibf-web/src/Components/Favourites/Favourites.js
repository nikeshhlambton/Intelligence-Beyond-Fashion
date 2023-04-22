import React, { useState } from "react";
import PaymentModal from "./paymentModal";
import { useSelector } from "react-redux";

// Favourites component to display user's favourite trends
const Favourites = () => {
  // State to store payment modal data
  const [paymentModelData, setPaymentModelData] = useState({});

  // Retrieve favourite trends from Redux store
  const favTrends = useSelector((state) => state.trends.favTrends);

  // Render the favourites component
  return (
    <>
      <div className="container-fluid mt-5 mb-5">
        <div className="row mx-4">
          {/* Loop through favourite trends and display each one */}
          {favTrends?.map((trend, i) => {
            return (
              <div
                key={i}
                className="col-md-3 col-sm-4 mb-4 item"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => setPaymentModelData(trend)}
              >
                <div className="card item-card card-block trend_card">
                  <img src={trend.img} alt="Photo of sunset" />
                  <div className={"trend_card_body"}>
                    <h5 className="item-card-title mt-3 mb-3">{trend.title}</h5>
                    <p className="card-text">{trend.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Render payment modal with the selected trend */}
      <PaymentModal trend={paymentModelData} />
    </>
  );
};

export default Favourites;
