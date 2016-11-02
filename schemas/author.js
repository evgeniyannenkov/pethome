"use strict";
const mongoose = require('mongoose');
const hasher = require('password-hash-and-salt');

const authorSchema = new mongoose.Schema({
    "oauthID" : Number,
    "avatar" : String,
    "name" : String,
    "contactInfo" : {
        "email" : {
            type : String,
            validate : {
                validator : function ( v ) {
                    return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(
                        v);
                },
                "message" : '{VALUE} is not a valid email!'
            },
            required : [ true, 'email required' ],
            unique : true
        },
        "phone" : String
    },
    "password" : {
        type : String,
        validate : {
            validator : function ( v ) {
                return v.trim() !== "";
            },
            "message" : '{VALUE} empty'
        },
        required : [ true, 'password required' ]
    },
    is_admin : {
        type : Boolean,
        default : false
    },
    blocked : {
        type : Boolean,
        default : false
    },
    language : {
        type : String,
        default : "ru"
    }
});

authorSchema.methods.validatePassword = function ( password ) {
    return new Promise(( resolve, reject ) => {
        hasher(password).verifyAgainst(this.password, function ( err, verified ) {
            if ( err ) {
                reject(err);
            }
            if ( !verified ) {
                resolve({ success : false, message : "Login: Wrong Password" });
            } else {
                resolve({ success : true, message : "Login: Correct Password" });
            }
        });
    });
};

module.exports = mongoose.model('Author', authorSchema);