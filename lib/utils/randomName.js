const chance = require('chance')();

function randomName() {
  //if local is bad, try heroku
  return chance.name();
}

module.exports = randomName;
