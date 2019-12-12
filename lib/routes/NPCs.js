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
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const updateObj = {};
    if (name) updateObj.name = name;
    if (description) updateObj.description = description;

    NPC.findByIdAndUpdate(id, updateObj, { new: true })
      .then(updated => res.send(updated))
      .catch(next);
  });
