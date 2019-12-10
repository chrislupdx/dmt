const { Router } = require('express');
const Keyword = require('../models/Keywords');

module.exports = Router().post('/', (req, res, next) => {
  const { keyword } = req.body;
  Keyword.create({ keyword })
    .then(keyword => res.send(keyword))
    .catch(next);
});
