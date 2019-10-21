const classesRouter = require('express').Router();
const Classes = require('../../../data/models/classes.model');
const restricted = require('../../auth/restricted');

function allClasses(req, res) {
  Classes.find()
    .then(classes => res.json(classes))
    .catch(err => res.status(500).json(err));
}

classesRouter.get('/', restricted, allClasses);

module.exports = classesRouter;
