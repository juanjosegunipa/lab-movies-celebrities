// const { application } = require("express");
// const Express = require('express')
const Celebrity = require("../models/Celebrity.model.js");
const mongoose = require('mongoose');
// const app = Express();


const router = require("express").Router();

router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity.hbs')
})

router.post('/create', (req, res, next) => {
    const myCelebrityName = req.body.name;
    const myCelebrityOccupation = req.body.occupation;
    const myCelebrityCatchPhrase = req.body.catchPhrase;
    Celebrity.create({
        name: myCelebrityName,
        occupation: myCelebrityOccupation,
        catchPhrase: myCelebrityCatchPhrase
    })
        .then(savedCelebrity => {
            console.log(savedCelebrity)
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.send('celebrities/new-celebrity.hbs')
        })
});

router.get('/', (req, res, next) => {
    Celebrity.find()
        .then(myCelebritiesArray => {
            console.log(myCelebritiesArray);
            res.render('celebrities/celebrities.hbs', { myCelebritiesArray })
        })
        .catch(err => {
            console.log(err);
            res.send('There was an error trying to get the celebrities from the data base')
        })
});

module.exports = router;