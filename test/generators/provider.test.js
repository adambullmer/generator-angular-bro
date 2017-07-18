const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    fileList = [
        'app/test-module/provider.js',
        'tests/unit/test-module/provider.spec.js',
    ];

describe('generator-angular-bro:provider', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/provider'))
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
        const providerPath = 'app/test-module/provider.js';

        it('uses the correct provider name', function () {
            assert.fileContent(providerPath, /class TestModuleProvider \{/);
        });

        it('uses the provider decorator', function () {
            assert.fileContent(providerPath, /@provider/);
        });
    });
});

describe('genreator-angular-bro:provider test-module', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/provider'))
            .withArguments('test-module')
            .on('end', done);
    });

    it('creates files', function () {
        assert.file(fileList);
    });
});
