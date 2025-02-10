export class UIController {
  static displayForecast(forecast) {
    this.updateToday(forecast)
    this.updateDays(forecast)
  }
  
  static updateToday(forecast) {
    const elements = {
      icon: document.getElementById('icon-today'),
      temp: document.getElementById('temp-today'),
      precip: document.getElementById('precip-val'),
      humid: document.getElementById('humid-val'),
      wind: document.getElementById('wind-val'),
      day: document.getElementById('day-today'),
      date: document.getElementById('date-today'),
      time: document.getElementById('time-today')
    };
    const today = forecast.getToday()

    elements.icon.className = today.icon;
    elements.temp.innerText = today.temp;
    elements.precip.innerText = today.precipitation + '%';
    elements.humid.innerText = today.humidity + '%';
    elements.wind.innerText = today.windSpeed + 'kts';
    elements.day.innerText = today.day;
    elements.date.innerText = today.date;
    elements.time.innerHTML = `${today.time}<span>hrs</span>`
  }
  
  static updateDays(forecast) {
    const daysForecasts = forecast.getDays();
    document.querySelectorAll('article.forecast-day').forEach((day, i) => {
      if(daysForecasts[i]) this.updateDay(day, daysForecasts[i])
    })
  }

  static updateDay(day, forecast) {
    day.querySelector('.day').textContent = forecast.day;
    day.querySelector('.icon-day').textContent = "";
    day.querySelector('.icon-day').classList.add(forecast.icon);
    day.querySelector('.max').innerHTML = `<span>↑</span>${forecast.maxTemp}<span>°</span>`
    day.querySelector('.max').innerHTML = `<span>↓</span>${forecast.minTemp}<span>°</span>`
  }

}