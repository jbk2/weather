import { Forecast } from '../components/forecast';

describe('Forecast', () => {
  const forecast = new Forecast('London');

  describe('#formatDate', () => {
    test('#formatDate formats a valid epoch seconds value to a date', () => {
      const stubDate = new Date(1738947060 * 1000).getDate()
      expect(forecast.formatDate(1738947060)).toBe(stubDate);
    });
    
    test('#formatDate returns an error if invalid value is passed', () => {
      expect(() => forecast.formatDate('asdfasdfasd')).toThrow('not a number');
      expect(() => forecast.formatDate('')).toThrow('not a number');
      expect(() => forecast.formatDate(99999999999)).toThrow('greater than current epoch time');
      // Test for all failure conditions handles in the funciton
    });
  })

  describe('#formatDay', () => {
    const daysOfWeekShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const daysOfWeekLong = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const oneDaySecs = 60 * 60 * 24;
    const testEpochSecs = [1738947060, 1738947060 - oneDaySecs * 3]
    
    test('#formatDay with a valid epoch seconds value returns a, short or long, week day', () => {
      testEpochSecs.forEach((testEpoch) => {
        expect(daysOfWeekShort).toContain(forecast.formatDay(testEpoch, 'short'))
        expect(daysOfWeekLong).toContain(forecast.formatDay(testEpoch, 'long'))
      })
    });

    test('#formatDay returns an error if given a miliseconds, not seconds, value', () => {
      testEpochSecs.forEach((testEpoch) => {
        expect(() => {forecast.formatDay(testEpoch * 1000)}).toThrow('greater than current epoch time');
      })
      // Test for all failure conditions handles in the funciton
    })
  })

});