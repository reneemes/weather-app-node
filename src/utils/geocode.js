const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.positionstack.com/v1/forward?access_key=${process.env.GEOCODE_API_KEY}&query=${encodeURIComponent(address)}&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to location services.', undefined);
    } else if (!body?.data?.length) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].label
      });
    }
  });
};

module.exports = geocode;