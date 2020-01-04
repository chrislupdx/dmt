const axios = require('axios');

async function getKWList() {
  const url = 'http://localhost:5000/api/v1/keywords/';
  return axios
    .get(url)
    .then(res => {
      let allKWs = res.data;
      return allKWs;
    })
    .catch(error => {
      console.log(error);
    });
}

// async function RandomKW() {
//   await GETRandomKW;
// }

module.exports = getKWList;
