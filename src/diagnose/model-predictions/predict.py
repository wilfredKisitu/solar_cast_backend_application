import sys
import joblib
import numpy as np

# Load model and scalers
ann_model = joblib.load('./src/Pred-Models/best_xgb_model.pkl')
x_scaler = joblib.load('./src/Pred-Models/feature_scaler.pkl')  
y_scaler = joblib.load('./src/Pred-Models/power_scaler.pkl')  

# Get input data
temperature, humidity, wind_speed, solar_radiation = map(float, sys.argv[1:])

# Compute derived features
temp_solar = temperature * solar_radiation
solar_humidity_ratio = solar_radiation / humidity if humidity != 0 else 0  

# Create final input array
processed_input = np.array([[temperature, humidity, wind_speed, solar_radiation, temp_solar, solar_humidity_ratio]])

# Scale input data
scaled_input = x_scaler.transform(processed_input)  

# Make Prediction
scaled_prediction = ann_model.predict(scaled_input)

# Inverse transform prediction to original scale
prediction = y_scaler.inverse_transform(np.array(scaled_prediction).reshape(-1, 1))[0][0]

# Output result
print(prediction)
