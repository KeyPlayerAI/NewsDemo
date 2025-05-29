import React from 'react';
import { WeatherWidget } from '../components/WeatherWidget';
import './Weather.css';

// Mock data for the weather forecast
const weatherForecast = [
  { day: 'Mon', temperature: 72, condition: 'sunny' },
  { day: 'Tue', temperature: 68, condition: 'cloudy' },
  { day: 'Wed', temperature: 65, condition: 'rainy' },
  { day: 'Thu', temperature: 70, condition: 'cloudy' },
  { day: 'Fri', temperature: 75, condition: 'sunny' },
];

export const Weather: React.FC = () => {
  return (
    <div className="weather-page">
      <div className="page-header">
        <h1>Weather</h1>
        <p>Stay up to date with Carroll County's weather forecast</p>
      </div>
      
      <div className="weather-content">
        <WeatherWidget
          currentTemp={72}
          currentCondition="cloudy"
          location="Carroll County, GA"
          forecast={weatherForecast as any}
        />
        
        <div className="weather-info-section">
          <h2>Weather Alerts</h2>
          <div className="weather-alert">
            <div className="alert-icon">⚠️</div>
            <div className="alert-content">
              <h3>Flood Watch</h3>
              <p>A Flood Watch is in effect for parts of Carroll County through Wednesday evening. Heavy rainfall could lead to flash flooding in low-lying areas.</p>
              <span className="alert-time">Issued: 8:30 AM - April 12, 2025</span>
            </div>
          </div>
        </div>
        
        <div className="weather-map-section">
          <h2>Radar Map</h2>
          <div className="weather-map">
            <img 
              src="https://images.pexels.com/photos/3693787/pexels-photo-3693787.jpeg" 
              alt="Weather radar map" 
              className="radar-image"
            />
            <div className="map-overlay">
              <span className="map-label">Carroll County</span>
            </div>
          </div>
          <div className="map-controls">
            <button className="map-control-btn">Past Hour</button>
            <button className="map-control-btn active">Current</button>
            <button className="map-control-btn">Forecast</button>
          </div>
        </div>
        
        <div className="weather-tips-section">
          <h2>Weather Safety Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>Flood Safety</h3>
              <ul>
                <li>Never drive through flooded roads</li>
                <li>Move to higher ground if flooding occurs</li>
                <li>Keep emergency supplies ready</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>Storm Preparation</h3>
              <ul>
                <li>Secure outdoor furniture</li>
                <li>Charge electronic devices</li>
                <li>Keep flashlights and batteries handy</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>Heat Safety</h3>
              <ul>
                <li>Stay hydrated</li>
                <li>Limit outdoor activities during peak heat</li>
                <li>Check on elderly neighbors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};