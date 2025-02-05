import { WeatherApi } from "../services/weatherApi";

export class Forecast {
  #location;
  #forecastJSON;
  #todaysForecast;
  #day1Forecast;
  #day2Forecast;
  #day3Forecast;
  #day4Forecast;
  #day5Forecast;

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
    this.#day1Forecast = this.unpackFutureDay(forecast.days[1])
    this.#day2Forecast = this.unpackFutureDay(forecast.days[2])
    this.#day3Forecast = this.unpackFutureDay(forecast.days[3])
    this.#day4Forecast = this.unpackFutureDay(forecast.days[4])
    this.#day5Forecast = this.unpackFutureDay(forecast.days[5])
  }

  unpackToday(today) {
    return {
      day: this.getDate(today.datetimeEpoch),
      date: this.getDay(today.datetimeEpoch),
      time: today.datetime.slice(0, -3),
      temp: this.toCelsius(today.temp),
      icon: today.icon,
      precipitation: today.precipprob,
      humidity: today.humidity,
      wind: today.windspeed
    }
  }

  unpackFutureDay(day) {
    return {
      maxTemp: this.toCelsius(day.tempmax),
      minTemp: this.toCelsius(day.tempmin),
      icon: day.icon,
      precipitation: day.precipprob,
      humidity: day.humidity,
      wind: day.windspeed
    }
  }
  
  getForecastJSON() {
    return this.#forecastJSON;
  }
  getToday() {
    return this.#todaysForecast
  }
  getDay1() {
    return this.#day1Forecast
  }
  getDay2() {
    return this.#day2Forecast
  }
  getDay3() {
    return this.#day3Forecast
  }
  getDay4() {
    return this.#day4Forecast
  }
  getDay5() {
    return this.#day5Forecast
  }

  toCelsius(f) {
    return Math.floor(((f - 32) * 5) / 9);
  }

  getDay(epochSecs) {
    const date = new Date(epochSecs * 1000)
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
  
  getDate(epochSecs) {
    const date = new Date(epochSecs * 1000)
    return date.getDate();
  }
}