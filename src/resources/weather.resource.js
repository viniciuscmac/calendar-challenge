import BaseResource from './base.resource';

class WeatherResource extends BaseResource {
  getWeather(city) {
    return this.Get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=81fc2c03964360eb3a2325c7d490e77e`);
  }
}

export default WeatherResource;
