import { WeatherApi } from "../services/weatherApi";

export class Forecast {
  #location;
  #forecastJSON;

  constructor(location) {
    this.setLocation(location);
  }

  setLocation(location) {
    this.#location = location;
  }
  
  getLocation() {
    return this.#location;
  }

  async fetchForecast() {
    this.#forecastJSON = await WeatherApi.getForecast(this.getLocation());
  }
  
  getForecastJSON() {
    return this.#forecastJSON;
  }

  
}