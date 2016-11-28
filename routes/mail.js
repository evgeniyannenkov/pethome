"use strict";

const router = require('express').Router();
const mailer = require("../config/mailer");

const email = {
    to : [ 'jeka.annenkov@gmail.com', 'fine.ok92@gmail.com' ],
    from : 'roger@tacos.com',
    subject : 'Hi there',
    text : 'Awesome sauce',
    html : '<h1>Awesome sauce</h1>'
};

router.get("/", ( req, res, next ) => {
    mailer.send(email)
          .then(( response ) => {
              res.json(response);
          })
          .catch(( error ) => {
              res.json(error);
          });
});

