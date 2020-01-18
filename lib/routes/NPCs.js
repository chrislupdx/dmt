const { Router } = require('express');
const NPC = require('../models/NPC');
const randomName = require('../utils/randomName');
const returnRandomKWPromise = require('../utils/returnRandomKWPromise');

module.exports = Router()
  .post('/', (req, res, next) => {
    let reqObj = {};
    const { name, description, health } = req.body;
    if (name) reqObj.name = name;
    if (!name) reqObj.name = randomName();
    if (health) reqObj.health = health;
    // if (description) reqObj.description = description; //could we actually pass reqObj.description as into a function, and return it
    let reqDescript = reqObj.description;
    if (description.length < 3) { //even if this logic doesn't work it, it won't interrupt the service
      let needed = 3 - description.length;
      returnRandomKWPromise()
        .then(res => {
          console.log('success', res);
          reqDescript = res; //passing res into reqDescript so its more readable when it push it in as the description obj
          console.log(reqObj, 'leave everything');
          //push description: 'asdfdf'
        })
        .catch(res => console.log(res));
        
      console.log('-3');
      NPC.create(reqObj)
        .then(NPC => res.send(NPC))
        .catch(next);
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
