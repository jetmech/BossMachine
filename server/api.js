const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./api/minions');
const ideasRouter = require('./api/ideas');

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);

module.exports = apiRouter;
