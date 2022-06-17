const { fetchMyIP, fetchCoordsByIP } = require('./iss');
const myIP = '23.16.35.123';

fetchMyIP((error, ip) => {
  if (error) {
    console.log(`It didn't work! ${error}`);
    return;
  }
  console.log(`It worked! Returned IP: ${ip}`);
});
fetchCoordsByIP((error, GeoCoords) => {
  if (error) {
    console.log(`It didn't work! ${error}`);
    return;
  }
  console.log('It worked! Returned GeoCoords: ', GeoCoords);
});
