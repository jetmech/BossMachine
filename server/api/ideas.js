const ideasRouter = require('express').Router();
const checkMillionDollarIdea = require('../checkMillionDollarIdea');
const db = require('../db');

ideasRouter.param('ideaId', (req, res, next, id) => {
  let idea = {};
  if (id) {
    idea = db.getFromDatabaseById('ideas', id);
  } else {
    res.status(400).send();
  }

  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get('/', (req, res, next) => {
  const ideas = db.getAllFromDatabase('ideas');
  res.send(ideas);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
  const newIdea = db.updateInstanceInDatabase('ideas', req.body);
  res.send(newIdea);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  let idea = req.body;
  if (validIdea(idea)) {
    let newIdea = db.addToDatabase('ideas', idea);
    res.status(201).send(newIdea);
  } else {
    res.status(404).send();
  }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  if (db.deleteFromDatabasebyId('ideas', req.idea.id)) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

function validIdea(idea) {
  let validName = typeof idea.name === 'string';
  let validDescription = typeof idea.description === 'string';
  let validNumWeeks = typeof idea.numWeeks === 'number';
  let validWeeklyRevenue = typeof idea.weeklyRevenue === 'number';

  return validName && validDescription && validNumWeeks && validWeeklyRevenue;
}

module.exports = ideasRouter;