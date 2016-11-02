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

const ifNotAdmin = ( req, res, next ) => {
    if ( req.user && req.user.is_admin ) {
        return next();
    }
    return res.render('error', {
        message : "Not found"
    });
};

module.exports = {
    ifLoggedOut,
    ifNotAdmin
};