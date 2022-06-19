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

const fetchCoordsByIP = (ip, callback) => {
  request(
    `https://api.ipbase.com/v2/info?apikey=wW5xnPAH4CDovM15CyKoDs0KZTcfF7OnJ0W9MAJO&ip=${ip}`,
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

const fetchFlyOvers = (coords, callback) => {
  // console.log(coords);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Flyovers: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchFlyOvers(coords, (error, passes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passes);
      });
    });
  });
};
module.exports = { nextISSTimesForMyLocation };
