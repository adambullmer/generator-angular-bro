const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    fileList = [
        'app/test-module/service.js',
        'tests/unit/test-module/service.spec.js',
    ];

describe('generator-angular-bro:service', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/service'))
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
        const modulePath = 'app/test-module/service.js';

        it('uses the correct service name', function () {
            assert.fileContent(modulePath, /class TestModuleService \{/);
        });

        it('uses the service decorator', function () {
            assert.fileContent(modulePath, /@service/);
        });
    });
});

describe('genreator-angular-bro:service test-module', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/service'))
            .withArguments('test-module')
            .on('end', done);
    });

    it('creates files', function () {
        assert.file(fileList);
    });
});
