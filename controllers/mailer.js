"use strict";

const base64 = require('js-base64').Base64;
const hasher = require('../config/hasher');
const mailer = require('../config/mailer');
const md5 = require('md5');

const sendVerificationMail = ( email ) => {
    const token = process.env.EMAIL_VERIFY_SECRET + email;
    const emailHash = base64.encodeURI(email);

    hasher.generateHash(token)
          .then(( hash ) => {
              mailer.send({
                  to : [email],
                  from : 'pethome@gmail.com',
                  subject : 'Email Verification',
                  html : `<h4>Confirm <a href="${process.env.HOST}/author/verify/${emailHash}/${hash}">email</a></h4>`
              });
          });

};

const sendSocialRegistrationMail = ( email, password, type ) => {

    mailer.send({
        to : [email],
        from : 'pethome@gmail.com',
        subject : `Registration via ${type}`,
        html : `<h4>Password ${password}</h4>`
    });

};

module.exports = {
    sendVerificationMail,
    sendSocialRegistrationMail
};