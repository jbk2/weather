export class UIController {
  static displayForecast(forecast) {
    UIController.updateToday(forecast)
    UIController.updateDays(forecast)
  }
  
  static updateToday(forecast) {
    const today = forecast.getToday()
    const [todayIcon, todayTemp, todayPrecip, todayHumid, todayWind, todayDay, todayDate, todayTime] =
    [ document.getElementById('icon-today'), document.getElementById('temp-today'),
      document.getElementById('precip-val'), document.getElementById('humid-val'),
      document.getElementById('wind-val'), document.getElementById('day-today'),
      document.getElementById('date-today'), document.getElementById('time-today'),
    ]
    todayIcon.className = today.icon;
    todayTemp.innerText = today.temp;
    todayPrecip.innerText = today.precipitation + '%';
    todayHumid.innerText = today.humidity + '%';
    todayWind.innerText = today.windSpeed + 'kts';
    todayDay.innerText = today.day;
    todayDate.innerText = today.date;
    todayTime.innerHTML = `${today.time}<span>hrs</span>`
  }
  
  static updateDays(forecast) {
    const days = Array.from(document.querySelectorAll('article.forecast-day'));
    const daysForecasts = forecast.getDays();
    days.forEach((day, i) => UIController.updateDay(day, daysForecasts[i]))
  }

  static updateDay(day, forecast) {
    day.querySelector('.day').textContent = forecast.day;
    day.querySelector('.icon-day').textContent = "";
    day.querySelector('.icon-day').classList.add(forecast.icon);
    day.querySelector('.max').innerHTML = `<span>↑</span>${forecast.maxTemp}<span>°</span>`
    day.querySelector('.max').innerHTML = `<span>↓</span>${forecast.minTemp}<span>°</span>`
  }

}