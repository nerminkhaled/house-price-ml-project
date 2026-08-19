import { useLocation, useNavigate } from "react-router-dom";

import type { PredictionRequest } from "../types/prediction";


interface ResultState {
  request: PredictionRequest;
  predictedPrice: number;
}


function formatIndianRupees(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(price);
}


function formatCompactPrice(price: number): string {
  if (price >= 10_000_000) {
    return `₹ ${(price / 10_000_000).toFixed(2)} Cr`;
  }

  if (price >= 100_000) {
    return `₹ ${(price / 100_000).toFixed(2)} Lac`;
  }

  return `₹ ${formatIndianRupees(price)}`;
}


export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as ResultState | null;


  if (!state) {
    return (
      <main className="page">
        <section className="card empty-result">
          <h1>
            No prediction found
          </h1>

          <p>
            Please enter property details first.
          </p>

          <button
            className="predict-button"
            onClick={() => navigate("/")}
          >
            Back to Prediction
          </button>
        </section>
      </main>
    );
  }


  return (
    <main className="page">

      <section className="result-card">

        <p className="eyebrow">
          ESTIMATED PROPERTY VALUE
        </p>

        <h1>
          Your predicted price
        </h1>

        <div className="price">
          {formatCompactPrice(
            state.predictedPrice
          )}
        </div>

        <p className="price-full">
          ₹ {formatIndianRupees(
            state.predictedPrice
          )}
        </p>


        <div className="result-details">

          <div>
            <span>Location</span>
            <strong>
              {state.request.location}
            </strong>
          </div>

          <div>
            <span>Carpet Area</span>
            <strong>
              {state.request.carpet_area_sqft} sqft
            </strong>
          </div>

          <div>
            <span>Bathrooms</span>
            <strong>
              {state.request.bathroom}
            </strong>
          </div>

          <div>
            <span>Balconies</span>
            <strong>
              {state.request.balcony}
            </strong>
          </div>

          <div>
            <span>Furnishing</span>
            <strong>
              {state.request.furnishing}
            </strong>
          </div>

          <div>
            <span>Transaction</span>
            <strong>
              {state.request.transaction}
            </strong>
          </div>
          <div>
            <span>Car Parking</span>
            <strong>
              {state.request.car_parking}
            </strong>
          </div>
          <div>
            <span>Total Floors</span>
            <strong>
              {state.request.total_floors}
            </strong>
          </div>
          <div>
            <span>Facing</span>
            <strong>
              {state.request.facing}
            </strong>
          </div>
          <div>
            <span>Ownership</span>
            <strong>
              {state.request.ownership}
            </strong>
          </div>
          <div>
            <span>Floor Number</span>
            <strong>
              {state.request.floor_number}
            </strong>
          </div>
          

        </div>


        <button
          className="predict-button"
          onClick={() => navigate("/")}
        >
          Predict Another Property
        </button>

      </section>

    </main>
  );
}