"use strict";
const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema({
    "name" : {
        type : String,
        required : [ true, 'pet name required' ]
    },
    "type" : {
        type : String,
        required : [ true, 'pet type required' ],
        default: "dog"
    },
    "gender" : {
        type : String,
        required : [ true, 'pet gender required' ],
        default: "boy"
    },
    "age" : {
        type : String,
        required : [ true, 'pet age required' ],
        default : "1"
    },
    "publicationDate" : {
        type : Date,
        default : new Date()
    },
    "breed" : String,
    "info" : String,
    "advertiserID" : {
        type : mongoose.Schema.Types.ObjectId,
        required : [ true, 'advertiserID required' ],
    },
});

module.exports = mongoose.model('Advert', advertSchema);