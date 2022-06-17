const request = require('request');

const fetchMyIP = callback => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};
const fetchCoordsByIP = (callback, ip) => {
  request(
    'https://api.ipbase.com/v2/info?apikey=wW5xnPAH4CDovM15CyKoDs0KZTcfF7OnJ0W9MAJO&ip=23.16.35.123',
    (error, response, body) => {
      if (error) return callback(error, null);
      if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching GeoCoords: ${body}`), null);
        return;
      }
      const geoCoords = {
        latitude: JSON.parse(body).data.location.latitude,
        longitude: JSON.parse(body).data.location.longitude,
      };
      callback(null, geoCoords);
    },
  );
};

module.exports = { fetchMyIP, fetchCoordsByIP };
