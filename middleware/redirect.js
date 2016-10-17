"use strict";

const ifLoggedOut = ( url ) => {

    url = url || "/";

    return ( req, res, next ) => {
        if ( req.user ) {
            return next();
        }
        return res.redirect(url);
    };
};

module.exports = {
    ifLoggedOut
};