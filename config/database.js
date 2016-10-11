"use strict";

const mongoose = require('mongoose');
const dbName = 'db-engine';

mongoose.connect(`mongodb://localhost/${dbName}`, (error) => {
    if(error) {
        console.log('Connection Failed');
    } else {
        console.log(`Connected to ${dbName}`);
    }
});

module.exports = mongoose.connection;