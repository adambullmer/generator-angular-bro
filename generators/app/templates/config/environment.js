module.exports = function (environment) {
    'use strict';

    var ENV = {
        environment: environment,
        html5Mode: true,
        overrideConfig: true,
        routes: {},
    };

    if (environment === 'development') {

    }

    if (environment === 'test') {
        // Karma prefers this
        ENV.html5Mode = false;
    }

    if (environment === 'production') {

    }

    return ENV;
};
