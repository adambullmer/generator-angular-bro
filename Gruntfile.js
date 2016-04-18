module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true,
                ignores: ['**/templates/']
            },
            all: {
                src: ['generators', 'lib', 'test']
            }
        },
        jscs: {
            all: {
                options: {},
                src: ['generators/*/index.js', 'lib', 'test']
            }
        },
        mochaTest: {
            generators: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        }
    });

    grunt.registerTask('default', 'test');

    grunt.registerTask('test', [
        'jshint',
        'jscs',
        'mochaTest'
    ]);
};
