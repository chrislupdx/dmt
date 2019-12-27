const { Router } = require('express');
const NPC = require('../models/NPC');
const randomKW = require('../utils/randKW');
const randomName = require('../utils/randomName');
const randomNum = require('../utils/getRandNum');

module.exports = Router()
  .post('/', (req, res, next) => {
    let reqObj = {};
    const { name, description, health } = req.body;
    if (name) reqObj.name = name;
    if (!name) reqObj.name = randomName();
    if (health) reqObj.health = health;

    if (description.length < 3) {
      let needed = 3 - description.length;
      for(let i = 0; i < needed; i++) {
        randomKW().then(res => { 
          // console.log(res, ' res');
          // let ordVals = res.length - 1; 
          // let randKWPos = randomNum(0, ordVals);
          // let randKW = res[randKWPos]; //grab a random kw
          // description.push(randKW); //put that keyword into description
          // reqObj.description = newDescrip;
        });
      }
    }

    NPC.create(reqObj)
      .then(NPC => res.send(NPC))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    NPC.find()
      .populate('description', {
        keyword: true
      })
      .then(NPC => res.send(NPC))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    // console.log('route /:id', req.body);
    NPC.findById(req.params.id)
      .populate('description', {
        keyword: true
      })
      // .then(npc => {
      //   console.log('afterpop', npc);
      // })
      .then(NPC => res.send(NPC))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    // console.log(req.body);
    const { id } = req.params;
    const { name, description, health } = req.body;
    const updateObj = {};
    if (name) updateObj.name = name;
    if (description) updateObj.description = description;
    if (health) updateObj.health = health;
    NPC.findByIdAndUpdate(id, updateObj, { new: true })
      .then(updated => res.send(updated))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    NPC.findByIdAndDelete(id)
      .then(result => res.send(result))
      .catch(err => {
        next(err);
      });
  });
