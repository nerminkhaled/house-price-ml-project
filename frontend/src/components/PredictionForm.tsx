import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { predictHousePrice } from "../api/predictionClient";
import type { PredictionRequest } from "../types/prediction";


const FURNISHING_OPTIONS = [
  "Furnished",
  "Semi-Furnished",
  "Unfurnished",
];

const TRANSACTION_OPTIONS = [
  "New Property",
  "Resale",
];

const OWNERSHIP_OPTIONS = [
  "Freehold",
  "Leasehold",
  "Co-operative Society",
  "Power Of Attorney",
];

const FACING_OPTIONS = [
  "North",
  "South",
  "East",
  "West",
  "North-East",
  "North-West",
  "South-East",
  "South-West",
];


export default function PredictionForm() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState<string[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);

  const [formData, setFormData] = useState<PredictionRequest>({
    location: "",
    carpet_area_sqft: 0,
    floor_number: 0,
    bathroom: 0,
    balcony: 0,
    car_parking: 0,
    total_floors: 0,
    furnishing: "",
    transaction: "",
    ownership: "",
    facing: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    async function loadLocations() {
      try {
        const response = await fetch("/locations.json");

        if (!response.ok) {
          throw new Error("Could not load locations.");
        }

        const data: string[] = await response.json();

        setLocations(data);
      } catch {
        setError(
          "Could not load locations. Please refresh the page and try again."
        );
      } finally {
        setLoadingLocations(false);
      }
    }

    loadLocations();
  }, []);


  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        name === "carpet_area_sqft" ||
        name === "floor_number" ||
        name === "bathroom" ||
        name === "balcony" ||
        name === "car_parking" ||
        name === "total_floors"
            ? Number(value)
            : value,
    }));

    setError("");
  }


  function validateForm(): string | null {
    if (!formData.location) {
      return "Please select a location.";
    }

    if (formData.carpet_area_sqft <= 0) {
      return "Carpet area must be greater than 0.";
    }

    if (formData.floor_number < 0) {
      return "Floor number cannot be negative.";
    }

    if (formData.car_parking < 0) {
      return "Number of car parking spaces cannot be negative.";
    }

     if (formData.total_floors < 1) {
     return "Total floors must be at least 1.";
    }

    if (formData.bathroom < 0) {
      return "Number of bathrooms cannot be negative.";
    }

    if (formData.balcony < 0) {
      return "Number of balconies cannot be negative.";
    }

    if (!formData.furnishing) {
      return "Please select the furnishing status.";
    }

    if (!formData.transaction) {
      return "Please select the transaction type.";
    }

    if (!formData.ownership) {
      return "Please select the ownership type.";
    }

    if (!formData.facing) {
      return "Please select the facing direction.";
    }

    return null;
  }


  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await predictHousePrice(formData);

      navigate("/result", {
        state: {
          request: formData,
          predictedPrice: result.predicted_price,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <form className="prediction-form" onSubmit={handleSubmit}>

      <div className="form-grid">

        {/* Location */}
        <div className="form-group full-width">
          <label htmlFor="location">
            Location
          </label>

          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={loadingLocations || isSubmitting}
          >
            <option value="">
              {loadingLocations
                ? "Loading locations..."
                : "Select location"}
            </option>

            {locations.map((location) => (
              <option
                key={location}
                value={location}
              >
                {location}
              </option>
            ))}
          </select>
        </div>


        {/* Carpet Area */}
        <div className="form-group">
          <label htmlFor="carpet_area_sqft">
            Carpet Area (sqft)
          </label>

          <input
            id="carpet_area_sqft"
            name="carpet_area_sqft"
            type="number"
            min="1"
            step="0.01"
            value={
              formData.carpet_area_sqft === 0
                ? ""
                : formData.carpet_area_sqft
            }
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="e.g. 1200"
          />
        </div>


        {/* Floor */}
        <div className="form-group">
          <label htmlFor="floor_number">
            Floor
          </label>

          <input
            id="floor_number"
            name="floor_number"
            type="number"
            min="0"
            value={formData.floor_number}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="e.g. 3"
          />
        </div>
        {/* Total Floors */}
        <div className="form-group">
           <label htmlFor="total_floors">
              Total Floors
            </label>

          <input
           id="total_floors"
           name="total_floors"
           type="number"
           min="1"
           step="1"
           value={formData.total_floors === 0 ? "" : formData.total_floors}
           onChange={handleChange}
           disabled={isSubmitting}
           placeholder="e.g. 5"
           />
        </div>

        {/* Bathroom */}
        <div className="form-group">
          <label htmlFor="bathroom">
            Bathrooms
          </label>

          <input
            id="bathroom"
            name="bathroom"
            type="number"
            min="0"
            step="1"
            value={formData.bathroom}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="e.g. 2"
          />
        </div>


        {/* Balcony */}
        <div className="form-group">
          <label htmlFor="balcony">
            Balconies
          </label>

          <input
            id="balcony"
            name="balcony"
            type="number"
            min="0"
            step="1"
            value={formData.balcony}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="e.g. 1"
          />
        </div>

        {/* Car Parking */}
        <div className="form-group">
          <label htmlFor="car_parking">
            Car Parking
          </label>
          <input
            id="car_parking"
            name="car_parking"
            type="number"
            min="0"
            step="1"
            value={formData.car_parking}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="e.g. 1"
          />
        </div>

        {/* Furnishing */}
        <div className="form-group">
          <label htmlFor="furnishing">
            Furnishing
          </label>

          <select
            id="furnishing"
            name="furnishing"
            value={formData.furnishing}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="">
              Select furnishing
            </option>

            {FURNISHING_OPTIONS.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>


        {/* Transaction */}
        <div className="form-group">
          <label htmlFor="transaction">
            Transaction
          </label>

          <select
            id="transaction"
            name="transaction"
            value={formData.transaction}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="">
              Select transaction
            </option>

            {TRANSACTION_OPTIONS.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>


        {/* Ownership */}
        <div className="form-group">
          <label htmlFor="ownership">
            Ownership
          </label>

          <select
            id="ownership"
            name="ownership"
            value={formData.ownership}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="">
              Select ownership
            </option>

            {OWNERSHIP_OPTIONS.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>


        {/* Facing */}
        <div className="form-group">
          <label htmlFor="facing">
            Facing
          </label>

          <select
            id="facing"
            name="facing"
            value={formData.facing}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="">
              Select facing
            </option>

            {FACING_OPTIONS.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>

      </div>


      {error && (
        <div className="error-message">
          {error}
        </div>
      )}


      <button
        type="submit"
        disabled={isSubmitting || loadingLocations}
        className="predict-button"
      >
        {isSubmitting
          ? "Predicting..."
          : "Predict House Price"}
      </button>

    </form>
  );
}