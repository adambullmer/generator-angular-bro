module.exports = function (config) {
    'use strict';
    /**
     * WARNING: No not set the following properties. They will be
     * overwritten in the execution of the karma tests:
     *     - files
     *     - exclude
     *     - autoWatch
     *     - singleRun
     */
    var configuration = {
        browsers         : [ 'PhantomJS' ],
        frameworks       : [ 'jasmine' ],
        reporters        : [ 'dots', 'coverage', 'kjhtml'],
        preprocessors    : { 'app/**/*.js': 'coverage' },
        coverageReporter : { type: 'text' }
    };

    config.set(configuration);
};
