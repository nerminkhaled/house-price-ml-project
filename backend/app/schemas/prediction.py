from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    carpet_area_sqft: float = Field(..., gt=0)

    floor_number: int = Field(..., ge=0)

    bathroom: int = Field(..., ge=0)

    balcony: int = Field(..., ge=0)

    car_parking: int = Field(..., ge=0)

    total_floors: int = Field(..., ge=1)

    furnishing: str = Field(..., min_length=1)

    transaction: str = Field(..., min_length=1)

    ownership: str = Field(..., min_length=1)

    facing: str = Field(..., min_length=1)


class PredictionResponse(BaseModel):
    predicted_price: float