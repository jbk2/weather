import { Forecast } from '../components/forecast';

describe('Forecast', () => {
  test('#formatDate formats a valid epoch seconds value to a date', () => {
    const forecast = new Forecast('London');
    const stubDate = new Date(1738947060 * 1000).getDate()
    expect(forecast.formatDate(1738947060)).toBe(stubDate);
  });
  
  test('#formatDate returns an error if invalid value is passed', () => {
    const forecast = new Forecast('London');
    expect(() => forecast.formatDate('asdfasdfasd')).toThrow('invalid epoch seconds value passed');
    expect(() => forecast.formatDate('')).toThrow('invalid epoch seconds value passed');
    expect(() => forecast.formatDate(99999999999)).toThrow('invalid epoch seconds value passed');
  });
});