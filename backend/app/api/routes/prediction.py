from fastapi import APIRouter, HTTPException, Request

from app.schemas.prediction import (
    PredictionRequest,
    PredictionResponse,
)
from app.services.inference import predict
from app.services.preprocessing import preprocess_request


router = APIRouter()


@router.get("/health")
def health_check(request: Request):
    model = getattr(request.app.state, "model", None)

    return {
        "status": "ok",
        "model_loaded": model is not None,
    }


@router.post(
    "/predict",
    response_model=PredictionResponse,
)
def predict_house_price(
    payload: PredictionRequest,
    request: Request,
):
    model = getattr(request.app.state, "model", None)

    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model is not loaded",
        )

    try:
        features = preprocess_request(payload)

        predicted_price = predict(
            model,
            features,
        )

        return PredictionResponse(
            predicted_price=predicted_price
        )

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(exc)}",
        )