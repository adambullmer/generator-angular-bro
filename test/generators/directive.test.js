const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    fileList = [
        'app/test-module/directive.js',
        'app/test-module/template.html',
        'tests/unit/test-module/directive.spec.js',
    ];

describe('generator-angular-bro:directive', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/directive'))
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
        const modulePath = 'app/test-module/directive.js';

        it('uses the correct directive name', function () {
            assert.fileContent(modulePath, /class TestModule \{/);
        });

        it('uses the directive decorator', function () {
            assert.fileContent(modulePath, /@directive\(/);
        });
    });
});

describe('genreator-angular-bro:directive test-module', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/directive'))
            .withArguments('test-module')
            .on('end', done);
    });

    it('creates files', function () {
        assert.file(fileList);
    });
});
