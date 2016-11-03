"use strict";

const authors = require("./controllers/author");

const defaultData = [
    {
        name : "Dimas",
        password : "20228207",
        contactInfo : {
            email : "fine.ok92@gmail.com"
        },
        is_admin : true,
        language : "en"
    },
    {
        name : "Evgeniy",
        password : "0aed747f00",
        contactInfo : {
            email : "evgeniy.annenkov@farrosoft.com"
        },
        is_admin : true,
        language : "en"
    }
];

defaultData.forEach(( element )=> {
    authors.create(element)
           .then(( response ) => {
               //console.log(response);
           })
           .catch(( error ) => {
               // console.log(error.message);
           });
});