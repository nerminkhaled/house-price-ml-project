import joblib
from pathlib import Path

from app.core.config import settings


def load_model():
    """
    Load the trained sklearn Pipeline from disk.
    """

    model_path: Path = settings.model_path_resolved

    if not model_path.exists():
        raise FileNotFoundError(
            f"Model file not found: {model_path}"
        )

    return joblib.load(model_path)


def predict(model, features):
    """
    Run prediction using the loaded model.
    """

    prediction = model.predict(features)

    return float(prediction[0])