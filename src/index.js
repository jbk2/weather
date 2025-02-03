import './styles.css'
import { Forecast } from './forecast';

document.addEventListener('DOMContentLoaded', () => {
  const areaForm = document.getElementById('area-form')

  areaForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let inputVal = event.target.querySelector('input').value;
    console.log(inputVal);
    event.target.reset();
    
    const forecast = new Forecast(inputVal);
    await forecast.fetchForecast();
    console.log(forecast.getForecastJSON())
    UIController.displayForecast(forecast.getForecastJSON())
    return forecast;
  });




});