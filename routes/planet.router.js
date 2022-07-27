const planetController = require('../controllers/planet.controller');
const express = require('express');
const planetRouter = express.Router();
const app = express();

planetRouter.use((req, res, next) => {
    console.log(`IP Address: ${req.ip}`);
    next();
});

planetRouter.get('/', planetController.getPlanets);
planetRouter.get('/:id', planetController.getPlanet);
planetRouter.get('/color/:color', planetController.getPlanetbyColor);
planetRouter.post('/', planetController.postPlanet);
planetRouter.put('/:id', planetController.putPlanet);
planetRouter.delete('/:id', planetController.deletePlanet);

module.exports = planetRouter;