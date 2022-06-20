const request = require('request-promise-native');

const fetchMyIp = () => {
  return request('https://api.ipify.org?format=json');
};
const fetchCoordsByIP = body => {
  const ip = JSON.parse(body).ip;
  return request(`https://api.ipbase.com/v2/info?apikey=wW5xnPAH4CDovM15CyKoDs0KZTcfF7OnJ0W9MAJO&ip=${ip}`);
};
const fetchISSFlyOverTimes = body => {
  const geoCoords = {
    latitude: JSON.parse(body).data.location.latitude,
    longitude: JSON.parse(body).data.location.longitude,
  };
  const url = `https://iss-pass.herokuapp.com/json/?lat=${geoCoords.latitude}&lon=${geoCoords.longitude}`;
  return request(url);
};
const nextISSTimeForMyLocation = () => {
  return fetchMyIp()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimeForMyLocation };
