import { WeatherApi } from "../services/weatherApi";

export class Forecast {
  #location;
  #forecastJSON;
  #todaysForecast;
  #daysForecasts;

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
    const forecast = await WeatherApi.getForecast(this.getLocation());
    this.#forecastJSON = forecast
    this.unpackForecast(forecast);  
  }
  
  unpackForecast(forecast) {
    this.#todaysForecast = this.unpackToday(forecast.currentConditions)
    this.#daysForecasts = this.unpackFutureDays(forecast.days)
  }

  unpackToday(today) {
    return {
      day: this.getDay(today.datetimeEpoch, 'long'),
      date: this.getDate(today.datetimeEpoch),
      time: today.datetime.slice(0, -3),
      temp: this.toCelsius(today.temp),
      icon: today.icon,
      precipitation: today.precipprob,
      humidity: Math.floor(today.humidity),
      windSpeed: Math.floor(today.windspeed)
    }
  }

  unpackFutureDays(days) {
    const daysForecasts = []
    days.shift()
    days.forEach((day) => {
      daysForecasts.push(
        { maxTemp: this.toCelsius(day.tempmax),
          minTemp: this.toCelsius(day.tempmin),
          icon: day.icon,
          day: this.getDay(day.datetimeEpoch, 'short')
        }
      )
    });
    return daysForecasts
  }
  
  getForecastJSON() {
    return this.#forecastJSON;
  }
  getToday() {
    return this.#todaysForecast
  }
  getDays() {
    return this.#daysForecasts
  }

  toCelsius(f) {
    return Math.floor(((f - 32) * 5) / 9);
  }

  getDay(epochSecs, length) {
    const date = new Date(epochSecs * 1000)
    return date.toLocaleDateString('en-US', { weekday: length });
  }
  
  getDate(epochSecs) {
    const date = new Date(epochSecs * 1000)
    return date.getDate();
  }
}