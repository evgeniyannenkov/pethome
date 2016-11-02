"use strict";

const ifLoggedOut = ( message ) => {

    message = message || "You should be logged in.";

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

const ifNotAdmin = ( message ) => {

    message = message || "You should be admin.";

    return ( req, res, next ) => {
        if ( req.user && req.user.is_admin ) {
            return next();
        }
        return res.json({
            message,
            success : false
        });
    };
};

const ifNotBlocked = ( message ) => {

    message = message || "This account is blocked";

    return ( req, res, next ) => {
        if ( req.user && req.user.is_admin ) {
            return next();
        }
        return res.json({
            message,
            success : false
        });
    };
};

module.exports = {
    ifLoggedOut,
    ifNotAdmin
};