const { Router } = require('express');
const NPC = require('../models/NPC');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, description } = req.body;
    NPC.create({ name, description })
      .then(NPC => res.send(NPC))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    NPC.find()
      .then(NPC => res.send(NPC))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    NPC.findById(req.params.id)
      .then(NPC => res.send(NPC))
      .catch(next);
  });
