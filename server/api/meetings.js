const meetingsRouter = require('express').Router();
const db = require('../db');

meetingsRouter.get('/', (req, res, next) => {
  const meetings = db.getAllFromDatabase('meetings');
  res.send(meetings);
});

meetingsRouter.post('/', (req, res, next) => {
  let meeting = req.body;
  if(validMeeting(meeting)) {
    let newMeeting = db.addToDatabase('meetings', meeting);
    res.status(201).send(newMeeting);
  } else {
    res.status(404).send();
  }
});

meetingsRouter.delete('/', (req, res, next) => {
  db.deleteAllFromDatabase('meetings');
  res.status(204).send();
});

function validMeeting(meeting) {
  let validTime = typeof meeting.time === 'string';
  let validDate = '';
  let validTitle = typeof meeting.title === 'string';
  let validSalary = typeof meeting.salary === 'number';

  return validTime && validTitle && validSalary;
}

module.exports = meetingsRouter;