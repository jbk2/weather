import { Forecast } from "../components/forecast";

describe("Forecast", () => {
  const forecast = new Forecast("London");

  describe("#formatDate", () => {
    test("#formatDate formats a valid epoch seconds value to a date", () => {
      const stubDate = new Date(1738947060 * 1000).getDate();
      expect(forecast.formatDate(1738947060)).toBe(stubDate);
    });

    test("#formatDate returns an error if invalid value is passed", () => {
      expect(() => forecast.formatDate("asdfasdfasd")).toThrow("not a number");
      expect(() => forecast.formatDate("")).toThrow("not a number");
      expect(() => forecast.formatDate(0)).toThrow("less than 1");
      expect(() => forecast.formatDate(NaN)).toThrow("NaN value");
      expect(() => forecast.formatDate(99999999999))
        .toThrow("greater than current epoch time"
      );
    });
  });

  describe("#formatDay", () => {
    const daysOfWeekShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const daysOfWeekLong = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const oneDaySecs = 60 * 60 * 24;
    const testEpochSecs = [1738947060, 1738947060 - oneDaySecs * 3];
    const epochSecsNow = Date.now() / 1000;

    test("given the correct epochSecs value returns the correct, short or long, week day", () => {
      testEpochSecs.forEach((testEpoch) => {
        expect(daysOfWeekShort).toContain(forecast.formatDay(testEpoch, "short"));
        expect(daysOfWeekLong).toContain(forecast.formatDay(testEpoch, "long"));
      });
    });
    
    test("returns an error if given a string as epochSecs", () => {
      expect(() => {forecast.formatDay("asdfasdf")}).toThrow("not a number");
    })
    
    test("returns an error if given less than 1 as epochSecs", () => {
      expect(() => {forecast.formatDay(0)}).toThrow("less than 1");
    })
    
    test("returns an error if given an epochSecs value more than 5 days in future", () => {
      expect(() => {forecast.formatDay(epochSecsNow + oneDaySecs * 6)}).toThrow("greater than current epoch time + 5 days");
    })
    
    test("returns an error if given a NaN epochSecs value", () => {
      expect(() => {forecast.formatDay(NaN)}).toThrow("NaN value");
    });
  });
});

// api testing:
// queueMicrotask.mockreturnvalueonce({})
// .mock.calls).toHaveLength(1)
// expect(someMockFunction.mock.calls[0][0]).toBe('correct url');
// mock.results[0].value).toBe('return json');
// mock.results[0].value.days.length).toEq(6);
// jest.spyOn(fetch, 'get').mockreturnvalueonce({
//   {json: 'json'}
// })