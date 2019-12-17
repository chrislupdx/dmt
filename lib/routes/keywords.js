const { Router } = require('express');
const Keyword = require('../models/Keywords');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { keyword } = req.body;
    Keyword.create({ keyword })
      .then(keyword => res.send(keyword))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Keyword.find()
      .then(keywords => res.send(keywords))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Keyword.findById(req.params.id)
      .then(keyword => res.send(keyword))
      .catch(next);
  });
