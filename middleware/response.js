"use strict";

const ifLoggedOut = ( message ) => {

    message = message || "Should be logged in";

    return ( req, res, next ) => {
        if ( req.user ) {
            return next();
        }
        return res.json({
            message,
            success : false
        });
    };
};

module.exports = {
    ifLoggedOut
};