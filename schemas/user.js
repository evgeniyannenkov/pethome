"use strict";
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    "name": String,
    "email" : {
        type : String,
        validate : {
            validator : function ( v ) {
                return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(
                    v);
            },
            "message" : '{VALUE} is not a valid email!'
        },
        required : [true, 'email required'],
        unique : true
    },
    "password" : {
        type : String,
        validate : {
            validator : function ( v ) {
                return v.trim() !== "";
            },
            "message" : '{VALUE} empty'
        },
        required : [true, 'password required']
    },
});

module.exports = mongoose.model('User', userSchema);