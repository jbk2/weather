import './assets/stylesheets/styles.css'
import { Forecast } from './components/forecast';
import { UIController } from './services/UIController';

document.addEventListener('DOMContentLoaded', () => {
  const areaForm = document.getElementById('area-form');

  areaForm.addEventListener('submit', handleFormSubmit);
  
  async function handleFormSubmit(event) {
    event.preventDefault();
    let inputVal = event.target.querySelector('input').value;
    if(!inputVal) return;

    event.target.reset();
    const forecast = new Forecast(inputVal);
    await forecast.fetchForecast();

    if(forecast.getForecastJSON()) {
      UIController.displayForecast(forecast);
    } else {
      alert('Failed to fetch forecast data.');
    } 
  }
});