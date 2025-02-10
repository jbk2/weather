export class WeatherApi {
  static async getForecast(location) {
    try {
      const response = await fetch(`/api/weather/?location=${location}`);
      if (!response.ok)
        throw new Error(
          `Http Error, status: ${response.status} message: ${response.message}`
        );
      return await response.json();
    } catch (error) {
      console.log("Weather API fetch error;", error);
      return null;
    }
  }
}
