import './assets/stylesheets/styles.css'
import { Forecast } from './components/forecast';
import { UIController } from './services/UIController';

document.addEventListener('DOMContentLoaded', () => {
  const areaForm = document.getElementById('area-form')

  areaForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let inputVal = event.target.querySelector('input').value;
    event.target.reset();
    
    const forecast = new Forecast(inputVal);
    await forecast.fetchForecast();
    UIController.displayForecast(forecast);
    return forecast;
  });

});