const {heroes} = require('../model/data');
const Hero = require('../model/hero.model');

function getHeroes(req, res) {
    Hero.find()
    .then((result) => {
        res.send(result);
    }).catch((err) => {res.status(500).send(err)});
}
function getHero(req, res) {
    Hero.findOne({heroId: req.params.id})
    .then((result) =>{
        if (result) {
            res.send(result)
        } else {res.status(400).send(`Hero id ${req.params.id} does not exist`)}
    })
    .catch((err) => res.status(500).send(err));
}
function getHeroesByOrigin(req, res) {
    Hero.find({origin: req.params.origin})
    .then((result) => {
        if (result) {
            res.send(result)
        } else {res.status(400).send(`Hero origin ${req.params.color} does not exist`)}
    }).catch((err) => {res.status(500).send(err)});
}
function getHeroesByPower(req, res) {
    Hero.find({power: {$lte: req.params.power}})
    .then((result) => {
        if (result) {
            res.send(result)
        } else {res.status(400).send(`Hero with power below ${req.params.power} does not exist`)}
    }).catch((err) => {res.status(500).send(err)});
}
function postHero(req, res) {
    if (!req.body.name && !req.body.origin) {
        return res.status(400).send('Hero\'s name and origin are mandatory');
    }
    const hero = new Hero({
        name: req.body.name,
        origin: req.body.origin,
        power: req.body.power,
        icon: req.body.icon
    });
    hero.save()
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
}
function putHero(req, res) {
    if (!req.body.name && !req.body.origin) {
        return res.status(400).send('Missing hero\'s name and origin');
    }
    Hero.findOneAndUpdate({heroId: req.params.id}, {
        name: req.body.name,
        origin: req.body.origin,
        power: req.body.power,
        icon: req.body.icon
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
}
function deleteHero(req, res) {
    Hero.findOneAndDelete({heroId: req.params.id})
    .then((result) => {
        res.send(result);
    }).catch((err) => {res.status(500).send(err)});
} 

module.exports = {
    getHeroes, getHero, getHeroesByOrigin, getHeroesByPower,
    postHero, putHero, deleteHero
}