const axios = require('axios');

const RandomKW = () => {
  const url = 'http://localhost:5000/api/v1/keywords/';
  axios
    .get(url)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = RandomKW;
