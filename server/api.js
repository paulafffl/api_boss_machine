const express = require('express');
const apiRouter = express.Router();

module.exports = apiRouter;

const minionsRouter = require('./minions.js');
apiRouter.use('/minions', minionsRouter);