const express = require('express');
const heroController = require('../controllers/hero.controller')

const heroRouter = express.Router();
heroRouter.get('/', heroController.getHeroes);
heroRouter.get('/:id', heroController.getHero);
heroRouter.get('/origin/:origin', heroController.getHeroesByOrigin);
heroRouter.get('/power/:power', heroController.getHeroesByPower);
heroRouter.post('/', heroController.postHero);
heroRouter.put('/', heroController.putHero);
heroRouter.delete('/:id', heroController.deleteHero);

module.exports = heroRouter;