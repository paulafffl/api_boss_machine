const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const db = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
   const minion = getFromDatabaseById('minions', id);
   if (minion) {
      req.minion = minion;
      next();
   } else {
      res.status(404).send();
   }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('minions'));
 });
 
 minionsRouter.post('/', (req, res, next) => {
   if (typeof req.body.name !== 'string' ||  typeof req.body.title !== 'string' || typeof req.body.weaknesses !== 'string' || typeof req.body.salary !== 'number') {
      res.status(400).send();
      return;
   }
   const reqBodyProperties = {
      name: req.body.name,
      title: req.body.title,
      weaknesses: req.body.weaknesses,
      salary: req.body.salary
   }
   const newMinion = addToDatabase('minions', reqBodyProperties)
   res.status(201).send(newMinion);
}); 
 
minionsRouter.get('/:minionId', (req, res, next) => {
   res.send(req.minion);
});
 
minionsRouter.put('/:minionId', (req, res, next) => {
   if (typeof req.body.name !== 'string' ||  typeof req.body.title !== 'string' || typeof req.body.weaknesses !== 'string' || typeof req.body.salary !== 'number') {
      res.status(400).send();
      return;
   }
   const reqBodyProperities = {
      name: req.body.name,
      title: req.body.title,
      weaknesses: req.body.weaknesses,
      salary: req.body.salary,
      id: req.params.id
   }
   const updatedMinion = db.updateInstanceInDatabase('minions',reqBodyProperities);
   if (!updatedMinion) {
      res.status(400).send();
      return;
   }
   res.status(200).send(updatedMinion);
});
 
minionsRouter.delete('/:minionId', (req, res, next) => {
   const minionDeleted = deleteFromDatabasebyId('minions', req.params.minionId);
   if (minionDeleted) {
      res.status(204).send();
   } else {
      res.status(404).send();
   }
});