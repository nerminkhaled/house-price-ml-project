import pandas as pd

from app.schemas.prediction import PredictionRequest


def preprocess_request(request: PredictionRequest) -> pd.DataFrame:
    """
    Convert the API request into the exact feature names
    expected by the trained model.
    """

    data = {
        "carpet_area_sqft": [request.carpet_area_sqft],
        "Floor_Number": [request.floor_number],
        "Bathroom": [request.bathroom],
        "Balcony": [request.balcony],
        "Car Parking": [request.car_parking],
        "Total_Floors": [request.total_floors],
        "Furnishing": [request.furnishing],
        "Transaction": [request.transaction],
        "Ownership": [request.ownership],
        "facing": [request.facing],
    }

    return pd.DataFrame(data)