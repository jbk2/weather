import { Forecast } from '../components/forecast';

test('formats from epoch seconds to a date', () => {
  const forecast = new Forecast('London');
  expect(forecast.formatDate(1738947060)).toBe(7);
})