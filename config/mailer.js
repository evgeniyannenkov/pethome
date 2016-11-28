"use strict";

const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const options = {
    auth : {
        api_key : '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'
    }
};

const mailer = nodemailer.createTransport(sgTransport(options));

const send = ( email ) => {

    return new Promise(( resolve, reject ) => {
        mailer.sendMail(email, function ( err, res ) {
            if ( err ) {
                reject(err);
            }
            resolve(res);
        });
    });
};

module.exports = {
    send
};