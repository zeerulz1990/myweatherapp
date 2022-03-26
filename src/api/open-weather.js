import axios from 'axios'
import { WeatherData } from '../data/weather-data';

const API_KEY = "b5ab3130dfb0827f94e2f61630c71bfd";

export const getWeatherInformation = cityName => {
    const cityData = WeatherData.filter(el => el.cityName === cityName)[0];

    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.latitude}&lon=${cityData.longitude}&exclude=current,hourly,minutely,alerts&units=metric&appid=${API_KEY}`);
}
