export class WeatherApi {
  static async getForecast(location) {
    try {
      const response = await fetch(`/api/weather/?location=${location}`);
      const contentType = response.headers.get("content-type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      if (!response.ok) {
        return {
          error: typeof data === "string" ? data : JSON.stringify(data.error)
        };
      }

      console.log("this is the weatherApi data response", data);
      return data
    } catch (error) {
      console.error("Weather API fetch error:", error);
      return {
        error: "Network error",
        details: "Could not reach the weather service. Check your connection.",
      };
    }
  }
}
