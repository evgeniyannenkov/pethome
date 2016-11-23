"use strict";
const Pet = require('../schemas/pet');

const create = ( { userId, data } ) => {
    return new Promise(( resolve, reject ) => {
        const pet = new Pet();

        pet.title = data.title;
        pet.publicationDate = new Date().getTime();
        pet.type = data.type || pet.type;
        pet.gender = data.gender || pet.gender;
        pet.age = data.age || pet.age;
        pet.name = data.name || `${pet.type}, ${pet.gender} ${pet.age}`;
        pet.author = userId;

        if ( data.breed ) {
            pet.breed = data.breed;
        }

        if ( data.info ) {
            pet.info = data.info;
        }

        pet.save()
           .then(( data ) => {
               resolve({
                   success : true,
                   pet : data
               });
           })
           .catch(( error ) => {
               resolve({
                   success : false,
                   message : error.message
               });
           });
    });
};

module.exports = {
    create
};