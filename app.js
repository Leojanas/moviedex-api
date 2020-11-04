require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const MOVIEDEX = require('./moviedex.json')


const app = express()
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());

app.use(function validateBearerToken(req,res,next){
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization');
    if(!authToken || authToken.split(' ')[1] !== apiToken){
        return res.status(401).json({error: "Unauthorized request"})
    }
    next()
})

function handleGetMovie(req,res){
    let movies = MOVIEDEX;
    if(req.query.genre){
        movies = movies.filter(movie => (
            movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
        ))
    }
    if(req.query.country){
        movies = movies.filter(movie => (
            movie.country.toLowerCase().includes(req.query.country.toLowerCase())
        ))
    }
    if(req.query.avg_vote){
        if(!parseFloat(req.query.avg_vote)){
            return res.status(400).send('Invalid query term. avg_vote must be numeric.')
        }
        movies = movies.filter(movie => (
            parseFloat(movie.avg_vote) >= parseFloat(req.query.avg_vote)
        ))
    }
    res.json(movies)
}

app.get('/movie', handleGetMovie)

app.use((error, req, res, next) => {
    let response
    if (process.env.NODE_ENV === 'production') {
      response = { error: { message: 'server error' }}
    } else {
      response = { error }
    }
    res.status(500).json(response)
  })

module.exports = app;