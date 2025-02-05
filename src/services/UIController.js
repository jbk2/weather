export class UIController {
  static displayForecast(forecast) {
    console.log(forecast)
    console.log('today ==>>', forecast.getToday())
    console.log('day1 ==>>', forecast.getDay1())

    const [todayIcon, todayTemp, todayPrecip, todayHumid, todayWind, todayDay, todayDate, todayTime] =
      [ document.getElementById('icon-today'), document.getElementById('temp-today'),
        document.getElementById('precip-val'), document.getElementById('humid-val'),
        document.getElementById('wind-val'), document.getElementById('day-today'),
        document.getElementById('date-today'), document.getElementById('time-today'),
      ]
  }

  static extractData(forecast) {

  }

  

}

// data needed:

// temp
// icon
// precipprob
// humidity
// windspeed