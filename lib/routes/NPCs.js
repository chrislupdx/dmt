const { Router } = require('express');
const NPC = require('../models/NPC');
const randomName = require('../utils/randomName');
// const returnRandomKWPromise = require('../utils/returnRandomKWPromise');
const asyncGetKWList = require('../utils/syncgetKWList');
const getRandomArbitrary = require('../utils/getRandNum');

module.exports = Router()
  .post('/', (req, res, next)  => {
    let reqObj = {};
    const { name, description, health } = req.body;
    if (name) reqObj.name = name;
    if (!name) reqObj.name = randomName();
    if (health) reqObj.health = health;
    if (description.length < 3) {
      asyncGetKWList().then((response) => {
        console.log('res is ', response);
        let filledDesc = []; 
        // let lastKWOrd;
        for(let i = description.length; i < 3; i++)
        {
          let randomKWOrd = getRandomArbitrary(0, (response.length - 1));
          // if (randomKWOrd == lastKWOrd){ 
          // }
          lastKWOrd = randomKWOrd;
          console.log(randomKWOrd, 'randomkwnum');
          let randomKW = response[randomKWOrd];
          //if randomKW is the similar to any in reqObj.description or filledDesc, move it aside
          filledDesc.push(randomKW); //fill the empty array 
        }
        console.log('filledDesc is ', filledDesc);
        reqObj.description = filledDesc; //put the created array and put it into reqObj
        NPC.create(reqObj)
          .then(NPC => res.send(NPC))
          .catch(next);
      });
    }
    else {      
      console.log('resObj is ', reqObj);
      console.log('ugh fine');
      NPC.create(reqObj)
        .then(NPC => res.send(NPC))
        .catch(next);
    }
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
