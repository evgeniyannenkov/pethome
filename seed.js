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
    }
];

defaultData.forEach(( element )=> {
    authors.create(element)
           .then(( response ) => {
               console.log(response);
           })
           .catch(( response ) => {
               // console.log(response);
           });
});