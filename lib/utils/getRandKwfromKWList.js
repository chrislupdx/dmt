const axios = require('axios'); //does it need axios?
const getRandomNum = require('../utils/getRandNum.js');

async function getRandKW(res) {
  let array = res;
  let ordArrayLen = res.length - 1;
  let randomKWAddress = getRandomNum(0, ordArrayLen);
  let randomSelectedKW = array[randomKWAddress];
  
  //does we want to pass the whole object (with id and keyword)
  return randomSelectedKW;
}

module.exports = getRandKW;
