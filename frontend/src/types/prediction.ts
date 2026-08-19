export interface PredictionRequest {
location: string;
carpet_area_sqft: number;
floor_number: number; // was floor_num
bathroom: number;
balcony: number;
car_parking: number; // NEW
total_floors: number; // NEW
furnishing: string;
transaction: string;
ownership: string;
facing: string;
}

export interface PredictionResponse {
  predicted_price: number;
}