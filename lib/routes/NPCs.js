const { Router } = require('express');
const NPC = require('../models/NPC');

module.exports = Router()
// eslint-disable-next-line indent
.post('/', (req, res, next) => {
  const { name, description } = req.body;
  NPC.create({ name, description })
    .then(NPC => res.send(NPC))
    // .populate('NPC')
    .catch(next);
});
