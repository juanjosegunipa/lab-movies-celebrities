const Movie = require("../models/Movie.model.js");
const mongoose = require('mongoose');
const Celebrity = require("../models/Celebrity.model.js");

const router = require("express").Router();

router.get('/create', (req, res, next) => {
    Celebrity.find()
        .then(myCelebritiesArray => {
            res.render('movies/new-movie.hbs', { myCelebritiesArray })
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

router.post('/create', (req, res, next) => {
    Movie.create(req.body)
        .then(savedMovie => {
            console.log(savedMovie);
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.send('movies/new-movie.hbs')
        })
})

router.get('/', (req, res, next) => {
    Movie.find()
        .then(myMoviesArray => {
            console.log(myMoviesArray)
            res.render('movies/movies.hbs', { myMoviesArray })
        })
        .catch(err => {
            console.log(err);
            res.send('There was an error trying to get the movies from the data base')
        })
})

router.get('/:movieId', (req, res, next) => {
    Movie.findById(req.params.movieId)
        .populate('cast')
        .then(movie => {
            console.log(movie);
            res.render('movies/movie-details.hbs', { movie });
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

module.exports = router;