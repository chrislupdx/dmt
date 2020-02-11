const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(require('cors')());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/v1/npcs', require('./routes/NPCs'));
app.use('/api/v1/keywords', require('./routes/keywords'));

app.use(require('./middlware/not-found'));
app.use(require('./middlware/error'));

module.exports = app;
