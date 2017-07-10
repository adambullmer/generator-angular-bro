'use strict';
var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('generator-angular-bro:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({appName: 'testApp'})
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            '.babelrc',
            '.eslintrc',
            'bower.json',
            'Brocfile.js',
            'circle.yml',
            'Gruntfile.js',
            'karma.conf.js',
            'package.json',
            'app/app.js',
            'app/index.html',
            'app/router.js',
            'app/test-app.js',
            'assets/.gitkeep',
            'assets/.gitkeep',
            'config/environment.js',
            'styles/_colors.less',
            'styles/_mixins.less',
            'styles/_variables.less',
            'styles/app.less',
            'tests/e2e/.gitkeep',
            'tests/helpers/beforeAll.js',
            'tests/helpers/afterAll.js',
            'tests/unit/.gitkeep'
        ]);
    });

    describe('templates the app name', function () {
        it('app/app.js', function () {
            assert.fileContent('app/app.js', /\nimport testAppModule from 'app\/test-app';\n/);
            assert.fileContent('app/app.js', /\n    testAppModule.name\n/);
        });

        it('app/exportable.js', function () {
            assert.fileContent('app/test-app.js', /\nexport default angular\.module\('testApp', \[\]\);\n$/);
        });

        it('bower.json', function () {
            assert.fileContent('bower.json', /\n  "name": "test-app",\n/);
        });

        it('app/index.html', function () {
            assert.fileContent('app/index.html', /\n        <title>Test App<\/title>\n/);
        });

        it('package.json', function () {
            assert.fileContent('package.json', /\n  "name": "test-app",\n/);
        });
    });
});
