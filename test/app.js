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
            '.jscsrc',
            'bower.json',
            'Brocfile.js',
            'circle.yml',
            'Gruntfile.js',
            'index.html',
            'karma.conf.js',
            'package.json',
            'app/app.js',
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
});
