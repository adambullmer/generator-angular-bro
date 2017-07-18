const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    fileList = [
        'app/test-module/state.js',
        'app/test-module/template.html',
        'tests/unit/test-module/state.spec.js',
    ];

describe('generator-angular-bro:state', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/state'))
            .withPrompts({componentPath: 'testModule'})
            .on('end', done);
    });

    after(function () {
        const LINTER_SLOW = 1000,
            lint = require('mocha-eslint'),
            paths = [ './**/*.js' ],
            options = { slow: LINTER_SLOW };

        lint(paths, options);
    });

    it('creates files', function () {
        assert.file(fileList);
    });

    describe('generated state', function () {
        const statePath = 'app/test-module/state.js';

        it('uses the correct state controller name', function () {
            assert.fileContent(statePath, /class TestModuleState \{/);
        });

        it('uses the correct state name', function () {
            assert.fileContent(statePath, /@state\('test-module'\, \{\}\)/);
        });
    });
});

describe('genreator-angular-bro:state test-module', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/state'))
            .withArguments('test-module')
            .on('end', done);
    });

    it('creates files', function () {
        assert.file(fileList);
    });
});
