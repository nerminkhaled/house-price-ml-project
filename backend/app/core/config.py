from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BACKEND_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    app_name: str = "House Price Prediction API"
    app_version: str = "1.0.0"

    model_path: str = "models/house_price.pkl"
    locations_path: str = "models/locations.json"

    frontend_url: str = "http://localhost:5173"

    model_path_resolved: Path = BACKEND_DIR / model_path
    locations_path_resolved: Path = BACKEND_DIR / locations_path

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()