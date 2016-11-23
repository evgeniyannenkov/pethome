"use strict";

const authors = require("./controllers/author");
const pets = require("./controllers/pet");

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

function createAdmins () {
    defaultData.forEach(( element ) => {
        authors.create(element)
               .then(( response ) => {
                   //console.log(response);
               })
               .catch(( error ) => {
                   // console.log(error.message);
               });
    });
}

function createPets () {
    for ( let i = 1; i <= 500; i++ ) {
        pets.create({ userId : "5832d4f10d71a919d055902c", data : { title : i } })
            .then(( response ) => {
                //console.log(response);
            })
            .catch(( error ) => {
                // console.log(error.message);
            });
    }
}

createAdmins();
// createPets();