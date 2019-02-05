'use strict'
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Movie = new Schema({
    name: String,
    image_url: String,
    overview: String
})

module.exports = mongoose.model("Movie",Movie)