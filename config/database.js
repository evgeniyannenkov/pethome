"use strict";

const mongoose = require('mongoose');
const dbName = 'pethome_db';

mongoose.connect(`mongodb://localhost/${dbName}`, (error) => {
    if(error) {
        console.log('Connection Failed');
    } else {
        console.log(`Connected to ${dbName}`);
    }
});

module.exports = mongoose.connection;