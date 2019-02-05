'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/movie_db');
const db = mongoose.connection


db.on('error', (err)=>{
    console.log(err)
});
db.once('open', ()=> {
    console.log("db connect")
    // const Movie = require('./models/movie')
    // Movie.create({
    //     name:'Fake',
    //     image_url: 'Fake url',
    //     overview: 'Fake overview'
    // },(err,movie)=>{
    //     console.log(err)
    //     console.log(movie);
        
        
    // })
});

const port = 8000
let counter = 2

const movies = [{
    id: 1,
    tital: 'fake tital 1',
    image_url: 'fake image url 1',
    overview: 'fake overview1'
}, {
    id: 2,
    tital: 'fake tital 2',
    image_url: 'fake image url 2',
    overview: 'fake overview 2'
}]

const favorites = [];

// const setUser = (req, res, next) => {
//     if (req.get('admin')) {
//         req.user = { admin: true }
//     }
//     next()
//     //res.end()
// }

// const onlyAdmin = (req, res, next) => {
//     if (req.user && req.user.admin) {
//         next()
//     } else {
//         res.sendStatus(401)
//     }

// }

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(setUser)
// app.use(logMw2)

app.get('/movies', (req, res) => {
    console.log(req.user)

    const results = {
        results: movies
    }
    res.json(results)
})

app.get('/favorites', (req, res) => {
    console.log(req.user)
    const results = {
        results: favorites
    }
    res.json(results)
})

app.post('/favorites', (req, res) => {
    const fav = {
        id: ++counter,
        title: req.body.title
    }
    favorites.push(fav)
    res.json(fav)
})

app.delete('/favorites/:id', (req, res) => {
    const id =parseInt(req.params.id,10)
    const index = favorites.findIndex(fav => fav.id === id)

    if(index ===-1){
        return res.sendStatus(404) 
    }
    
        favorites.splice(index,1)
        res.sendStatus(200) 
    
    

})

app.listen(8000, () => console.log(`started at ${port}`))