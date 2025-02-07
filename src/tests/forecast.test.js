import { Forecast } from '../components/forecast';

describe('Forecast', () => {
  const forecast = new Forecast('London');
  

  test('#formatDate formats a valid epoch seconds value to a date', () => {
    const stubDate = new Date(1738947060 * 1000).getDate()
    expect(forecast.formatDate(1738947060)).toBe(stubDate);
  });
  
  test('#formatDate returns an error if invalid value is passed', () => {
    expect(() => forecast.formatDate('asdfasdfasd')).toThrow('invalid epoch seconds value passed');
    expect(() => forecast.formatDate('')).toThrow('invalid epoch seconds value passed');
    expect(() => forecast.formatDate(99999999999)).toThrow('invalid epoch seconds value passed');
  });

  test('#formatDay with a valid epoch seconds value returns a, short or long, week day', () => {
    const oneDaySecs = 60 * 60 * 24;
    const daysOfWeekShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const daysOfWeekLong = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const testEpochs = [1738947060, 1738947060 - oneDaySecs * 3]

    testEpochs.forEach((testEpoch) => {
      expect(daysOfWeekShort).toContain(forecast.formatDay(testEpoch, 'short'))
      expect(daysOfWeekLong).toContain(forecast.formatDay(testEpoch, 'long'))
    })
  });
});