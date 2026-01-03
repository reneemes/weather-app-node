const request = require('postman-request');

const forecast = (latitude, longitude, unit, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${latitude},${longitude}&units=${unit}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined);
    } else if (body.error) {
      callback('Unable to find location.', undefined);
    } else {
      const unitLabel =
        unit === 'm' ? '°C' :
        unit === 's' ? 'K'  :
        '°F';

      callback(
        undefined, `
        ${body.current.weather_descriptions[0]}. 
        It is currently ${body.current.temperature}${unitLabel} degrees out. 
        It feels like ${body.current.feelslike}${unitLabel} degrees out. 
        The humidity is ${body.current.humidity}%.`);
    }
  });
};

module.exports = forecast;