const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    fileList = [
        'app/test-module/factory.js',
        'tests/unit/test-module/factory.spec.js',
    ];

describe('generator-angular-bro:factory', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/factory'))
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

    describe('generated module', function () {
        const modulePath = 'app/test-module/factory.js';

        it('uses the correct factory name', function () {
            assert.fileContent(modulePath, /class TestModuleFactory \{/);
        });

        it('uses the factory decorator', function () {
            assert.fileContent(modulePath, /@factory/);
        });
    });
});

describe('genreator-angular-bro:factory test-module', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/factory'))
            .withArguments('test-module')
            .on('end', done);
    });

    it('creates files', function () {
        assert.file(fileList);
    });
});
