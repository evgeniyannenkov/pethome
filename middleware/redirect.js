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

const ifNotAdmin = ( url ) => {

    url = url || "/";

    return ( req, res, next ) => {
        if ( req.user && req.user.is_admin ) {
            return next();
        }
        return res.redirect(url);
    };
};

module.exports = {
    ifLoggedOut,
    ifNotAdmin
};