from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "ok"


def test_invalid_prediction():
    payload = {
        "location": "new-delhi",
        "carpet_area_sqft": -100,
        "floor_num": 2,
        "bathroom": 2,
        "balcony": 1,
        "furnishing": "Semi-Furnished",
        "transaction": "Resale",
        "ownership": "Freehold",
        "facing": "East",
    }

    response = client.post(
        "/predict",
        json=payload,
    )

    assert response.status_code == 422