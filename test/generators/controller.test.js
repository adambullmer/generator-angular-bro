const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    fileList = [
        'app/test-module/controller.js',
        'tests/unit/test-module/controller.spec.js',
    ];

describe('generator-angular-bro:controller', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/controller'))
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
        var modulePath = 'app/test-module/controller.js';

        it('uses the correct controller name', function () {
            assert.fileContent(modulePath, /class TestModuleController \{/);
        });

        it('uses the controller decorator', function () {
            assert.fileContent(modulePath, /@controller/);
        });
    });
});

describe('genreator-angular-bro:controller test-module', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/controller'))
            .withArguments('test-module')
            .on('end', done);
    });

    it('creates files', function () {
        assert.file(fileList);
    });
});
