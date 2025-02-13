## Description
This is a [project](https://www.theodinproject.com/lessons/javascript-weather-app) from The Odin Project's Javascript course. A vanilla JS app that fetches weather data from the OpenWeatherMap API and displays a weather forecast to the user.

The current app code on branch 'main' is configured to run a node ExpressJS server to handle API requests. The version of the build pushed to the 'gh-page' branch is configured to make requests directly to the OpenWeatherMap API. This is to avoid having to find a host solution for the ExpressJS app.

The 'main' branch, not the 'gh-page' reflected on the github pages URL, is fully tested using Jest and Supertest.

To run in development:
  - frontend webpack server up: `npm run serve`
  - backend server up: `npm run devStart` (uses nodemon)
Production (behind) version is running at; 'https://jbk2.github.io/weather/' (calling API directly)

## Technical notes:
- The app bundles with Webpack.
- The app uses the Fetch API to make requests to the OpenWeatherMap API.
- 

### ToDo list:
- Integrate geolocation API to get users location.



