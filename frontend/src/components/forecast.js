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
    this.#forecastJSON = forecast;
    this.unpackForecast(forecast);
  }

  unpackForecast(forecast) {
    this.#todaysForecast = this.unpackToday(forecast.currentConditions);
    this.#daysForecasts = this.unpackFutureDays(forecast.days.slice(1));
  }

  unpackToday(today) {
    return {
      day: this.formatDay(today.datetimeEpoch, "long"),
      date: this.formatDate(today.datetimeEpoch),
      time: today.datetime.slice(0, -3),
      temp: this.toCelsius(today.temp),
      icon: today.icon,
      precipitation: today.precipprob,
      humidity: Math.floor(today.humidity),
      windSpeed: Math.floor(today.windspeed),
    };
  }

  unpackFutureDays(days) {
    return days.map((day) => ({
      day: this.formatDay(day.datetimeEpoch, "short"),
      icon: day.icon,
      maxTemp: this.toCelsius(day.tempmax),
      minTemp: this.toCelsius(day.tempmin),
    }));
  }

  getForecastJSON() {
    return this.#forecastJSON;
  }
  getToday() {
    return this.#todaysForecast;
  }
  getDays() {
    return this.#daysForecasts;
  }

  toCelsius(f) {
    return Math.floor(((f - 32) * 5) / 9);
  }

  formatDay(epochSecs, length) {
    // validate epochSecs
    const nowEpochSecs = Math.floor(Date.now() / 1000);
    const fiveDaysOfSeconds = 60 * 60 * 25 * 5;
    const errors = [];

    if (typeof epochSecs !== "number") errors.push("not a number");
    if (epochSecs < 1) errors.push("less than 1");
    if (epochSecs > nowEpochSecs + fiveDaysOfSeconds)
      errors.push("greater than current epoch time + 5 days");
    if (isNaN(epochSecs)) errors.push("NaN value");

    if (errors.length > 0) {
      throw new Error(`Invalid epoch seconds value: ${errors.join(", ")}`);
    }

    // actual formatting code
    const date = new Date(epochSecs * 1000);
    return date.toLocaleDateString("en-US", { weekday: length });
  }

  formatDate(epochSecs) {
    // validate epochSecs
    const nowEpochSecs = Math.floor(Date.now() / 1000);
    const errors = [];

    if (typeof epochSecs !== "number") errors.push("not a number");
    if (epochSecs < 1) errors.push("less than 1");
    if (epochSecs > nowEpochSecs)
      errors.push("greater than current epoch time");
    if (isNaN(epochSecs)) errors.push("NaN value");

    if (errors.length > 0) {
      throw new Error(`Invalid epoch seconds value: ${errors.join(", ")}`);
    }

    // actual formatting code
    const date = new Date(epochSecs * 1000);
    return date.getDate();
  }
}
