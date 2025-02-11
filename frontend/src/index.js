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
    const success = await forecast.fetchForecast();

    if(success) {
      UIController.displayForecast(forecast);
    } 
  }
});