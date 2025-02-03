export class WeatherApi {
  
  static async getForecast(location) {
    try {
      // let unixTimeSecsNow = Math.floor(Date.now() / 1000);
      let dateToday = new Date(Date.now()).toISOString().split('T')[0];
      let dateIn5Days = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      // let unixTimeSecsPlus5Days = unixTimeSecsNow 
      const weatherApiKey = 'UK7QEAVD2N2BJANGP8Q3GGSFV'
      const baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${dateToday}/${dateIn5Days}?key=${weatherApiKey}&iconSet=icons1`;
      const response = await fetch(baseUrl);
      if(!response.ok) throw new Error(`Http Error, status: ${response.status}`)
      console.log(response);
      return await response.json();
    } catch (error) {
      console.log(error);
      return null;
    };
  }

}