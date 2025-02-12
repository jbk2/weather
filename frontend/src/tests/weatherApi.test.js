const { WeatherApi } = require("../services/weatherApi.js");

describe("WeatherApi service", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return parsed JSON data when the API reponds with valid weather data", async () => {
    const locations = ["london", "paris"];

    for (const location of locations) {
      const mockData = {
        address: location,
        currentConditions: { temp: 40, icon: "cloudy" },
        days: { 0: [], 1: [], 2: [], 3: [], 4: [] },
      };
      global.fetch.mockResolvedValue(
        new Response(JSON.stringify(mockData), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );
      const response = await WeatherApi.getForecast(location);
      expect(response).toEqual(mockData);
      expect(response.address).toEqual(location);
    }
    expect(fetch.mock.calls).toHaveLength(2);
    expect(fetch.mock.calls[0][0]).toBe(`/api/weather/?location=london`);
    expect(fetch.mock.calls[1][0]).toBe(`/api/weather/?location=paris`);
  });

  it("should process JSON error 400 response from an invalid location", async () => {
    global.fetch.mockResolvedValue(
      new Response(
        JSON.stringify({ error: "Bad API Request:Invalidlocation" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    );
    const response = await WeatherApi.getForecast("asdfasdfasdfas");
    expect(response).toEqual({ error: "Bad API Request:Invalidlocation" });
  });

  it("should handle network errors and return a structured error response", async () => {
    global.fetch.mockRejectedValue(new Error("Network connection lost"));
    const response = await WeatherApi.getForecast("london");

    expect(response).toEqual({
      error: "Network error",
      details: "Network connection lost",
    });
  });
});
