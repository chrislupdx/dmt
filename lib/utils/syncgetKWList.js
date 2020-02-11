const axios = require('axios');

function asyncGetKWList() {

  const url = 'http://localhost:5000/api/v1/keywords/';
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        console.log('got list', res.data);
        resolve(res.data);
      })
      .catch((err) => {
        console.log('err', err);
        reject(err);
      }); 
  });
}

module.exports = asyncGetKWList;
