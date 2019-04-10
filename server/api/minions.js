const minionsRouter = require('express').Router();
const db = require('../db');

minionsRouter.param('minionId', (req, res, next, id) => {
  let minion = {};
  if (id) {
    minion = db.getFromDatabaseById('minions', id);
  } else {
    res.status(400).send();
  }

  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.param('workId', (req, res, next, id) => {
  let work = {};
  if (id) {
    work = db.getFromDatabaseById('work', id);
  } else {
    res.status(400).send();
  }

  if (work) {
    req.work = work;
    next();
  } else {
    return res.status(404).send();
  }
});

minionsRouter.get('/', (req, res, next) => {
  const minions = db.getAllFromDatabase('minions');
  res.send(minions);
});

minionsRouter.post('/', (req, res, next) => {
  let minion = req.body;
  if(validMinion(minion)) {
    let newMinion = db.addToDatabase('minions', minion);
    res.status(201).send(newMinion);
  } else {
    res.status(404).send();
  }
});

minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
  const newMinion = db.updateInstanceInDatabase('minions', req.body);
  res.send(newMinion);
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
  const work = db.getAllFromDatabase('work');
  const minionWork = work.filter(work => work.minionId == req.minion.id);
  return res.send(minionWork);
});

/*
minionsRouter.post('/:minionId/work', (req, res, next) => {

});
*/

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.minion.id === req.work.minionId){
    const newWork = db.updateInstanceInDatabase('work', req.body);
    return res.send(newWork);
  } else {
    return res.status(400).send();
  }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  db.deleteFromDatabasebyId('work', req.work.id);
  return res.status(204).send();
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  if(db.deleteFromDatabasebyId('minions', req.minion.id)) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

function validMinion(minion) {
  let validName = typeof minion.name === 'string';
  let validTitle = typeof minion.title === 'string';
  let validSalary = typeof minion.salary === 'number';

  return validName && validTitle && validSalary;
}

module.exports = minionsRouter;