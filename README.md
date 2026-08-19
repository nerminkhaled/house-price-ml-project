# 🏠 House Price Prediction

An end-to-end Machine Learning web application that predicts house prices in India based on property characteristics.

The project covers the complete ML workflow:

- Data collection and exploration
- Data cleaning and feature engineering
- Exploratory Data Analysis (EDA)
- Machine Learning model training
- Model evaluation and comparison
- FastAPI backend
- React + TypeScript frontend
- End-to-end prediction

---

## 📌 Project Overview

The goal of this project is to build a complete house price prediction system using real estate listings from India.

The user enters property details such as:

- Location
- Carpet Area
- Floor
- Number of Bathrooms
- Number of Balconies
- Furnishing Status
- Transaction Type
- Ownership Type
- Facing Direction

The React frontend sends these details to a FastAPI backend.

The backend loads the trained Machine Learning pipeline and returns the predicted house price.

### End-to-End Flow


User
 │
 ▼
React + TypeScript Frontend
 │
 │ POST /predict
 ▼
FastAPI Backend
 │
 ▼
Preprocessing
 │
 ▼
Trained ML Pipeline
 │
 ▼
House Price Prediction
 │
 ▼
JSON Response
 │
 ▼
Result Page

## Tech Stack

### Machine Learning
Python
Pandas
NumPy
Scikit-learn
Matplotlib
Seaborn
Joblib

### Backend
FastAPI
Uvicorn
Pydantic
Pydantic Settings
Scikit-learn
Joblib
Pytest

### Frontend
React
TypeScript
Vite
React Router
HTML
CSS

## 🧠 Machine Learning
### Dataset
The project uses the House Price dataset by Juhi Bhojani from Kaggle.

Dataset:                                               
https://www.kaggle.com/datasets/juhibhojani/house-price                                              
The dataset contains approximately 187,000 real estate listings from India.

### Model Training

The project compares multiple regression models:
Linear Regression
Random Forest Regressor
Gradient Boosting Regressor

The data is split into:
80% Training
20% Testing

A complete Scikit-learn Pipeline is used so that preprocessing and prediction are bundled together.

The final model is selected based on its performance on the test set
The selected model is exported as: house_price.pkl


## Installation & Setup
1. Clone the Repository
```bash
git clone https://github.com/nerminkhaled/house-price-ml-project.git
cd house-price-project
```  
## Backend Setup
Create Virtual Environment
```bash
python -m venv .venv
.venv\Scripts\activate
```
Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```
Environment Variables
Create `backend/.env`

### Run the Backend
From the backend directory `uvicorn app.main:app --reload`
The API will then be available at: `http://localhost:8000`
Swagger documentation at `:http://localhost:8000/docs`
## Frontend Setup
Open a new terminal: `cd frontend` Install dependencies: `npm install`
### Run the Frontend
`npm run dev`
The frontend will normally be available at: `http://localhost:5173`

## 🧠 Machine Learning
### Exploratory Data Analysis

The notebook includes at least four EDA visualizations:

##### 1. Price Distribution

The target price is highly right-skewed, so a logarithmic scale is used to make the distribution easier to analyze.

##### 2. Price vs Carpet Area

A scatter plot is used to investigate the relationship between property size and price.

##### 3. Average Price by Top Locations

The average house price is calculated for the top 15 locations.

This helps identify geographical differences in property prices.

##### 4. Price by Furnishing / Bathrooms

Box plots are used to compare house prices across furnishing categories and bathroom count

### Data Cleaning & Feature Engineering

The dataset contains several messy fields that require preprocessing

1.Price Parsing are converted into numerical values and Rows without a usable price are removed

2.Floor Processing are converted into usable numerical floor information

3.Missing Values Missing values are handled using appropriate imputation strategies (mode,median)

4.High Cardinality Locations contain many unique values  project groups less frequent locations into "other"and keeps the most important locations for one-hot encoding

5.Outlier Removal extreme price-per-square-foot values are removed using percentile-based filtering

### Model Training

A complete Scikit-learn Pipeline is used so that preprocessing and prediction are bundled together.

The pipeline contains:

Numerical Features
        │
        ▼
SimpleImputer
        │
        ▼
StandardScaler
        │
        ▼
Regression Model

and:

Categorical Features
        │
        ▼
SimpleImputer
        │
        ▼
OneHotEncoder
        │
        ▼
Regression Model

### Model Evaluation
Models are evaluated on the test set using:
MAE — Mean Absolute Error
RMSE — Root Mean Squared Error
R² — R-squared

## 3 Models Comparison

| Model             | MAE        |      RMSE     |      R²     |
| ----------------- | --:        |      ---:     |      --:    |
| Linear Regression |5.824509e+06|  1.674985e+08 | -163.556354 |
| Random Forest     |1.641502e+06| 5.810388e+06  |  0.801983   |
| Gradient Boosting |3.522234e+06|7.790707e+06   |  0.644003   |

## Architecture
                        ┌──────────────────┐               
                        │      User        │
                        └────────┬─────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │ React + TypeScript     │
                    │      Frontend          │
                    └───────────┬────────────┘
                                │
                         POST /predict
                                │
                                ▼
                    ┌────────────────────────┐
                    │       FastAPI          │
                    │       Backend          │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │ Input Validation       │
                    │      Pydantic          │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │    Preprocessing       │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │   house_price.pkl      │
                    │    ML Pipeline         │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │   Predicted Price      │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │     Result Page        │
                    │      Frontend          │
                    └────────────────────────┘

## Application Screenshots 
### Home / Prediction Form
<img width="1280" height="660" alt="image" src="https://github.com/user-attachments/assets/22636d70-5fb1-4c4b-9a50-e4790bb48b91" />
### Prediction Result
<img width="1280" height="668" alt="image" src="https://github.com/user-attachments/assets/3a77f643-f9f9-4fea-8b98-064a0c4e029b" />


