const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('Id', (req, res, next, id) => {
   const idea = getFromDatabaseById('ideas', id);
   if (idea) {
      req.idea = idea;
      next();
   } else {
      res.status(404).send();
   }
});

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
 });
 
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newidea = addToDatabase('ideas', req.body)
    res.status(201).send(newidea);
}); 
 
ideasRouter.get('/:id', (req, res, next) => {
   res.send(req.idea);
});
 
ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
  let updatedInstance = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedInstance);
});
 
ideasRouter.delete('/:id', (req, res, next) => {
   const ideaDeleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
   if (ideaDeleted) {
      res.status(204).send();
   } else {
      res.status(404).send();
   }
});