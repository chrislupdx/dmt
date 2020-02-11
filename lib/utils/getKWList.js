const axios = require('axios');

async function getKWList() {
  const url = 'http://localhost:5000/api/v1/keywords/';
  return axios
    .get(url)
    .then(res => {
      let allKWs = res.data; //I did this to say that res.data is in fact allKWs
      return allKWs;
    })
    .catch(error => {
      console.log(error);
    });
}



module.exports = getKWList;
