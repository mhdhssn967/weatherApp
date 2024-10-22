import React, { useState } from 'react';
import './App.css';
import sunImage from './assets/sun.png'; 
import windImage from './assets/wind.png'
import snowImage from './assets/snow.png'
import bg from './assets/19V4.gif'
import bg2 from './assets/19V5.gif'
import bg3 from './assets/sunn.webp'

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setError(''); 
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data); 
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (error) {
      setError('An error occurred while fetching the weather data');
    }
  };

  const setBG=(temp)=>{
    if (temp > 30) {
      return bg3; 
    } else if (temp >= 15 && temp <= 30) {
      return bg2; 
    } else {
      return bg; 
    }
  }

  const getWeatherIcon = (temp) => {
    if (temp > 30) {
      return sunImage; 
    } else if (temp >= 15 && temp <= 30) {
      return windImage; 
    } else {
      return snowImage; 
    }
  };

  return (
    <>
    <div className="weather-app">
      <h1 className="app-title">Weather Forecast</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="city-input"
        />
        <button onClick={fetchWeather} className="search-btn">
          Search
        </button>
      </div>
      

      

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-info">
          <div className='mMain'>
            <div className='mhead'>
              <div className="head">
                <h2>{weather.name}</h2>
                <h3>{Math.round(weather.main.temp)}°C</h3>
              </div>
              <div className="icon">
                <img src={getWeatherIcon(weather.main.temp)} alt="Weather Icon" />
              </div>
            </div>
          </div>
          <div className="forecast">
            <h3>Today's Forecast</h3>
            <div className="forecast-details">
              <div>Feels Like <h2>{Math.round(weather.main.feels_like)}°C</h2></div>
              <div>Min Temperature<h2>{weather.main.temp_min}°C</h2></div>
              <div>Max Temperature:<h2>{weather.main.temp_max}°C</h2></div>
              <div>Pressure<h2>{weather.main.pressure} hPa</h2></div>
              <div>Humidity<h2>{weather.main.humidity}%</h2></div>
              <div>Visibility<h2>{weather.visibility / 1000} km</h2></div>
              <div>Wind Speed<h2>{weather.wind.speed} m/s</h2></div>
            </div>
          </div>
          <div className='bg'><img src={setBG(weather.main.temp)} alt="" className='bgimg'/></div>
        </div>
        
      )
      }
    </div>
    </>
  );
}

export default App;
