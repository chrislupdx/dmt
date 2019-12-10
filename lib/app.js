const express = require('express');
const app = express();

app.use(require('cors')());
app.use(express.json());

app.use('/api/v1/keywords', require('./routes/keywords'));

module.exports = app;
