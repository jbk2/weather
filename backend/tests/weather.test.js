const request = require("supertest");
const fetch = require("node-fetch");
const app = require("../app.js");
const { Response } = jest.requireActual("node-fetch");
jest.mock("node-fetch");


describe('Weather API route', () =>  {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const mockData = {  currentConditions: { temp: 50 } };

  it("should return weather data when given a valid location", async () => {
    fetch.mockResolvedValue(new Response(JSON.stringify(mockData),
      { status: 200,
        headers: { "Content-Type": "application/json" }
      },
    ));
    const res = await request(app).get("/api/weather?location=london")
    
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('london'));
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/weather.visualcrossing.com\/VisualCrossingWebServices\/rest/));    
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });
  
  it("should return a 400 http code if no location is given", async () => {
    fetch.mockResolvedValue(new Response("Bad API Request:Invalid address format",
      { status: 400,
        headers: { "Content-Type": "text/plain" },
      }
    ));
    const res = await request(app).get("/api/weather");
    expect(res.status).toBe(400);
    expect(res.body.details).toContain("Bad API Request:Invalid address format");
  })
  
  it("should return a 400 error if an unresolvable location value is passed", async () => {
    fetch.mockResolvedValue(new Response("Bad API Request:Invalid location parameter value.",
      { status: 400,
        headers: { "Content-Type": "text/plain" },
      }
    ));
    const res = await request(app).get("/api/weather?location=kjglgcgc")
    
    expect(res.status).toBe(400);
    expect(res.body.error).toEqual("Invalid location");
    expect(res.body.details).toContain("Bad API Request:Invalid location parameter value.");
  })

  it("should return a 500 if the external api fails", async () => {
    fetch.mockResolvedValue(new Response("External API error",
      { status: 500,
        headers: { "Content-Type": "text/plain" },
      }
    ));
    const res = await request(app).get("/api/weather?location=london")

    expect(res.status).toBe(500);
    expect(res.body.error).toEqual("External API error");
  })

}) 

