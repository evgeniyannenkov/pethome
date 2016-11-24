"use strict";
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    "title" : {
        type : String,
        required : [true, 'title required']
    },
    "name" : {
        type : String,
        required : [true, 'pet name required']
    },
    "type" : {
        type : String,
        required : [true, 'pet type required'],
        default : "dog"
    },
    "gender" : {
        type : String,
        required : [true, 'pet gender required'],
        default : "male"
    },
    "age" : {
        type : String,
        required : [true, 'pet age required'],
        default : "1"
    },
    "publicationDate" : {
        type : Number
    },
    "breed" : String,
    "info" : String,
    "location" : String,
    "author" : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true, 'author required'],
    },
    "mainImage" : {
        type : String
    },
    "images" : {
        type : [String],
        default : []
    },
    "published" : {
        type : Boolean,
        default : true
    },
    "reviewed" : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('Pet', petSchema);