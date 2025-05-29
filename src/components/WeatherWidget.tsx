import React from 'react';
import { Cloud, Sun, CloudRain, Umbrella, Wind, Thermometer } from 'lucide-react';
import './WeatherWidget.css';

interface WeatherDay {
  day: string;
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'windy';
}

interface WeatherWidgetProps {
  currentTemp: number;
  currentCondition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'windy';
  location: string;
  forecast: WeatherDay[];
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  currentTemp,
  currentCondition,
  location,
  forecast,
}) => {
  const getWeatherIcon = (condition: string, size = 24) => {
    switch (condition) {
      case 'sunny':
        return <Sun size={size} />;
      case 'rainy':
        return <CloudRain size={size} />;
      case 'stormy':
        return <Umbrella size={size} />;
      case 'windy':
        return <Wind size={size} />;
      default:
        return <Cloud size={size} />;
    }
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return 'Sunny';
      case 'cloudy':
        return 'Partly Cloudy';
      case 'rainy':
        return 'Rain';
      case 'stormy':
        return 'Thunderstorms';
      case 'windy':
        return 'Windy';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="weather-widget-detailed">
      <div className="current-weather-detailed">
        <div className="current-icon">
          {getWeatherIcon(currentCondition, 48)}
        </div>
        <div className="current-info">
          <div className="current-temp">{currentTemp}°</div>
          <div className="current-condition">{getConditionText(currentCondition)}</div>
          <div className="current-location">{location}</div>
        </div>
      </div>
      
      <div className="weather-forecast">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <div className="forecast-day-name">{day.day}</div>
            <div className="forecast-icon">
              {getWeatherIcon(day.condition)}
            </div>
            <div className="forecast-temp">{day.temperature}°</div>
          </div>
        ))}
      </div>
      
      <div className="weather-details">
        <div className="weather-detail-item">
          <Thermometer size={16} />
          <span>Feels like: {currentTemp - 2}°</span>
        </div>
        <div className="weather-detail-item">
          <Wind size={16} />
          <span>Wind: 8 mph</span>
        </div>
      </div>
    </div>
  );
};