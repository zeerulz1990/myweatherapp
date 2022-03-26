import React, { useState } from 'react';
import './App.scss';
import { getWeatherInformation } from './api/open-weather';
import { days } from './data/weather-data';

function App() {
  const [weatherForecast, setWeatherForecast] = useState();
  const [selectedIndex, setSelectedIndex] = useState()

  const getWeatherForecast = (cityName, index) => {
    getWeatherInformation(cityName).then(res => {
      const data = res.data.daily;
      const weatherData = [];
      for (let i = 0; i < 5; i++) {
        const weatherObj = data[i];

        // get day of the week
        const ts = weatherObj.dt;
        const dayOfWeek = days[new Date(ts * 1000).getDay()];

        // create object
        weatherData.push({
          dayOfWeek: i === 0 ? 'Today' : dayOfWeek.substring(0, 3),
          temp: parseInt(weatherObj.temp.max),
          iconUrl: getWeatherUrl(weatherObj.weather[0].icon, i === 0 ? '4x' : '2x'),
          summary: weatherObj.weather[0].main,
        })
      }
      setWeatherForecast(weatherData);
      setSelectedIndex(index);
    });
  }

  const getWeatherUrl = (iconType, size) => {
    return `https://openweathermap.org/img/wn/${iconType}@${size}.png`;
  }

  return (
    <div className="App">
      <div className="city_list">
        <span onClick={() => getWeatherForecast('Ottawa', 0)} className={selectedIndex === 0 ? 'selected' : ''}>OTTAWA</span>
        <span onClick={() => getWeatherForecast('Moscow', 1)} className={selectedIndex === 1 ? 'selected' : ''}>MOSCOW</span>
        <span onClick={() => getWeatherForecast('Tokyo', 2)} className={selectedIndex === 2 ? 'selected' : ''}>TOKYO</span>
      </div>
      {weatherForecast && <div className="main_container">
        <div className="current_weather">
          <div>{weatherForecast[0].dayOfWeek}</div>
          <div className="current_weather_stats">
            <img src={weatherForecast[0].iconUrl} alt="Current Weather" />
            <div>{weatherForecast[0].temp}{'\u00b0'}</div>
          </div>
          <div className="current_weather_summary">{weatherForecast[0].summary}</div>
        </div>
        <div className="weather_forecasts">
          <div className="forecasts">
            <p>{weatherForecast[1].dayOfWeek}</p>
            <img src={weatherForecast[1].iconUrl} alt="Weather Forecast" />
            <p>{weatherForecast[1].temp}{'\u00b0'}</p>
          </div>
          <div className="forecasts">
            <p>{weatherForecast[2].dayOfWeek}</p>
            <img src={weatherForecast[2].iconUrl} alt="Weather Forecast" />
            <p>{weatherForecast[2].temp}{'\u00b0'}</p>
          </div>
          <div className="forecasts">
            <p>{weatherForecast[3].dayOfWeek}</p>
            <img src={weatherForecast[3].iconUrl} alt="Weather Forecast" />
            <p>{weatherForecast[3].temp}{'\u00b0'}</p>
          </div>
          <div className="forecasts">
            <p>{weatherForecast[4].dayOfWeek}</p>
            <img src={weatherForecast[4].iconUrl} alt="Weather Forecast" />
            <p>{weatherForecast[4].temp}{'\u00b0'}</p>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default App;
