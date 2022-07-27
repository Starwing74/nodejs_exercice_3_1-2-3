const {planets} = require('../model/data');
const Planet = require('../model/planet.model');

function getPlanets (req, res) {
    Planet.find()
    .then((result) => {
        res.send(result);
    }).catch((err) => {res.status(500).send(err)});
}
function getPlanet (req, res) {
    Planet.findOne({planetId: req.params.id})
    .then((result) =>{
        if (result) {
            res.send(result)
        } else {res.status(400).send(`Planet id ${req.params.id} does not exist`)}
    })
    .catch((err) => res.status(500).send(err));
}
function getPlanetbyColor (req, res) {
    Planet.find({color: req.params.color})
    .then((result) => {
        if (result) {
            res.send(result)
        } else {res.status(400).send(`Planet color ${req.params.color} does not exist`)}
    }).catch((err) => {res.status(500).send(err)});
}
function postPlanet (req, res) {
    if (!req.body.name) {
        return res.status(400).send('Missing planet\'s name');
    }
    const planet = new Planet({
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon
    });
    planet.save()
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
}
function putPlanet (req, res) {
    if (!req.body.name) {
        return res.status(400).send('Missing planet\'s name');
    }
    Planet.findOneAndUpdate({planetId: req.params.id}, {
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
}
function deletePlanet (req, res) {
    Planet.findOneAndDelete({planetId: req.params.id})
    .then((result) => {
        res.send(result);
    }).catch((err) => {res.status(500).send(err)});
}

module.exports = {
    getPlanets, getPlanet, getPlanetbyColor, postPlanet,
    putPlanet, deletePlanet
}