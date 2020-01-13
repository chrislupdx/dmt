const syncGetKWList = require('../utils/syncgetKWList');
const getRandomKW = require('../utils/getRandKW');

async function grabFunction() {
  console.log('grabFunction');
  let returnedRandKW = await syncGetKWList() //we pass the whole list down bc the next part is making the custom array
    .then(res => {
      console.log('await syncGetKWList res :', res);
      let getRandomKWPromise = getRandomKW(res);
      console.log('getRandomKWPromise is ', getRandomKWPromise);
      return getRandomKWPromise;
    })
    .catch(error => {
      console.log(error, ' is error');
    });
  return returnedRandKW;
  // .then(res => { //passing it onwards because it resolves into the datatype we want
  //   let newDescrip = [];
  //   newDescrip.push(res);
  //   console.log('newdescrip is ', newDescrip);
  //   return newDescrip; //ok but can we assign it to stuff on the outside (i'm pretty sure no)
  // });
  
}
module.exports = grabFunction;
