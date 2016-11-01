"use strict";

function currentUserServicesInit ( module ) {
    module.factory('currentUser', [
        "author", "$rootScope",
        function ( author, $rootScope ) {

            let current = {
                getting_user : false
            };

            current.get = ( callback ) => {
                if ( current.user ) {
                    callback(null, current.user);
                } else if ( current.getting_user ) {
                    $rootScope.$on('got_current_user', function ( event, data ) {
                        if ( data.success ) {
                            callback(null, current.user);
                        } else {
                            callback(data.error);
                        }
                    });
                } else {
                    current.getting_user = true;
                    author.getCurrent()
                              .then(( response )=> {
                                  if ( response.data.success && response.data.user ) {
                                      current.getting_user = false;
                                      current.user = response.data.user;
                                      callback(null, current.user);
                                      $rootScope.$broadcast("got_current_user", {
                                          success : true,
                                          user : current.user
                                      });
                                  }
                              })
                              .catch(( error )=> {
                                  current.getting_user = false;
                                  $rootScope.$broadcast("got_current_user", {
                                      success : false,
                                      error
                                  });
                                  callback(error);
                              });
                }
            };

            return current;
        }
    ]);
}