const request = require('postman-request');
WEATHERSTACK_API_KEY = 'cea46238e7183e8ba8a544a5cbb18ec0';

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service.', undefined);
    } else if (body.error) {
      callback('Unable to find location.', undefined);
    } else {
      callback(
        undefined, 
        `${body.current.weather_descriptions[0]}. 
        It is currently ${body.current.temperature} degrees out. 
        It feels like ${body.current.feelslike} degrees out. 
        The humidity is ${body.current.humidity}%.`);
    }
  });
};

module.exports = forecast;