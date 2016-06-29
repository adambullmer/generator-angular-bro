module.exports = function (grunt) {
    "use strict";

    var environment = grunt.option('environment') || 'development';

    switch (environment) {
        case 'production':
            break;
        case 'development':
            break;
        case 'test':
            break;
        default:
            console.log('Could not map environment `' + environment + '`');
            console.log('Defaulting to `development`');
            environment = 'development';
            break;
    }
    process.env.ANGULAR_ENV = environment;

    grunt.task.loadNpmTasks('grunt-contrib-clean');
    grunt.task.loadNpmTasks('grunt-broccoli');
    grunt.task.loadNpmTasks('grunt-bump');
    grunt.task.loadNpmTasks('grunt-exec');
    grunt.task.loadNpmTasks('grunt-express-server');

    grunt.initConfig({
        config: {
            destDir: 'dist/'
        },
        clean: {
            options : { force: true },
            dist    : [ '<%= config.destDir %>' ],
            tmp     : [ 'tmp' ]
        },
        broccoli: {
            dist: {
                dest: '<%= config.destDir %>',
            }
        },
        bump: {
            options: {
                files         : [ 'bower.json', 'package.json' ],
                commitFiles   : [ 'bower.json', 'package.json' ],
                commitMessage : 'Bumped version to: %VERSION%',
                createTag     : false,
                push          : false,

            }
        },
        exec: {
            updateWebdriver: {
                cmd: 'npm run update-webdriver'
            },
            broccoliTest: {
                cmd: 'npm test'
            }
        },
        express: {
            options: {
                port   : 4200,
                script : 'node_modules/angular-bro-app/lib/server.js'
            },
            e2e: {
                options: {
                    background: true
                }
            },
            server: {
                options: {
                    background: false,
                }
            }
        }
    });

    grunt.registerTask('default', 'Builds the angular app.', 'build');

    /**
     * Anything that is required for the app to be built should happen here.
     */
    grunt.registerTask('prebuild', 'Preps the environment for the build.', [
        'clean'
    ]);

    /**
     * Build routine with pre and post hooks. Any modifications should happen in either the
     * `prebuild` or `postbuild` tasks.
     */
    grunt.registerTask('build', 'Builds the angular app.', [
        'prebuild',
        'broccoli:dist:build',
        'postbuild'
    ]);

    /**
     * Anything that is required for the app to be served / deployed should happen here.
     */
    grunt.registerTask('postbuild', 'Post processing of the built angular app.', [
    ]);


    /**
     * Anything that is required for the app to be built and served should happen here.
     */
    grunt.registerTask('preserver', 'Prepwork for the server.', [
        'prebuild'
    ]);

    /**
     * Server routine with pre hooks. Any modifications should happen in the `preserver` task.
     * NOTE: There is not post hook as the last task is a forever running task, and any future
     * task wouldn't ever be run.
     */
    grunt.registerTask('serve',  'Builds and launches a server for the app.', 'server');
    grunt.registerTask('server', 'Builds and launches a server for the app.', function () {
        process.env.ANGULAR_SERVER   = true;
        process.env.ANGULAR_DEST_DIR = grunt.config('config').destDir;

        grunt.task.run([
            'preserver',
            'express:server'
        ]);
    });

    /**
     * Test prepwork goes here. In general you shouldn't need to modify this task, but rather update
     * the `prebuild` step.
     */
    grunt.registerTask('test', 'Builds and runs unit tests.', function () {
        var broccoliType = 'build';

        process.env.ANGULAR_TEST = true;
        process.env.ANGULAR_ENV  = 'test';

        if (!!grunt.option('server')) {
            broccoliType = 'server';
            process.env.ANGULAR_SERVER = true;
        }

        grunt.task.run(broccoliType);
    });
};
