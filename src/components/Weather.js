import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "daba474b379d40208100c7f945313e72"; // Replace with your Weatherbit API key

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const getWeatherData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`
      );
      const data = await response.json();
      setWeatherData(data.data[0]); // Weatherbit API returns data in a 'data' array
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1 className="app-title">Weather App</h1>
      <input
        className="city-input"
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
      />
      <button className="get-weather-button" onClick={getWeatherData}>
        Get Weather
      </button>

      {isLoading ? (
        <h1 className="loading-message">Please wait...</h1>
      ) : (
        weatherData && (
          <div className="weather-info">
            <h2>
              {" "}
              Your Location is :-
              {weatherData.city_name}, {weatherData.country_code}
            </h2>
            <h2>TimeZone:- {weatherData.timezone}</h2>
            <div className="temp">
              <p>Temperature: {weatherData.temp}°C</p>
            </div>
            <div className="weather-div">
              <p>Weather: {weatherData.weather.description}</p>
            </div>
            <div className="aqi">
              <p>Air Quality Index (AQI): {weatherData.aqi}</p>
            </div>
            <div className="apparent">
              <p>Apparent Temperature: {weatherData.app_temp}°C</p>
            </div>
            <div className="clouds">
              <p>Clouds: {weatherData.clouds}%</p>
            </div>
            <div className="dew">
              <p>Dew Point: {weatherData.dewpt}°C</p>
            </div>
            <div className="humidity">
              <p>Humidity: {weatherData.rh}%</p>
            </div>
            <div className="pressure">
              <p>Pressure: {weatherData.pres} hPa</p>
            </div>
            <div className="wind-speed">
              <p>Wind Speed: {weatherData.wind_spd} m/s</p>
            </div>
            <div className="wind-dir">
              <p>Wind Direction: {weatherData.wind_cdir}</p>
            </div>
            <div className="sunrise">
              <p>Sunrise: {weatherData.sunrise}</p>
            </div>
            <div className="sunset">
              <p>Sunset: {weatherData.sunset}</p>
            </div>
            <div className="uv">
              <p>UV Index: {weatherData.uv}</p>
            </div>
            <div className="visibility">
              <p>Visibility: {weatherData.vis} km</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Weather;
