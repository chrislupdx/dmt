const axios = require('axios');

function RandomKW() {
  const url = 'http://localhost:5000/api/v1/keywords/';
  return axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = RandomKW;
