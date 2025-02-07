export class WeatherApi {
  
  static async getForecast(location) {
    try {
      let dateToday = new Date(Date.now()).toISOString().split('T')[0];
      let dateIn5Days = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const weatherApiKey = 'UK7QEAVD2N2BJANGP8Q3GGSFV'
      const baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${dateToday}/${dateIn5Days}?key=${weatherApiKey}&iconSet=icons1`;
      const response = await fetch(baseUrl);

      if(!response.ok) throw new Error(`Http Error, status: ${response.status} message: ${response.message}`)
      
      return await response.json();
    } catch (error) {
      console.log("Weather API fetch error;",error);
      return null;
    };
  }

}