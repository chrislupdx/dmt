const mongoose = require('mongoose');

const npcSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Keyword'
    }
  ],
  health: {
    type: Number
  }
});

module.exports = mongoose.model('NPC', npcSchema);
