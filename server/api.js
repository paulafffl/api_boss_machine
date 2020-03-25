const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js')

module.exports = apiRouter;


app.get('/api/minions', (req, res, next) => {
   res.send(db.getAllFromDatabase('minions'));
});
  