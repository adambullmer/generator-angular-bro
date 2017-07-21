const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    generatorPath = path.join(__dirname, '../../generators/provider'),
    fileList = [
        'app/test-module/provider.js',
        'tests/unit/test-module/provider.spec.js',
    ];

describe('generator-angular-bro:provider', function () {
    after(function () {
        let outputDir = null;

        return helpers.run(generatorPath)
            .inTmpDir(function (tempDirectory) {
                outputDir = tempDirectory;
            })
            .withPrompts({ componentPath: 'testApp' })
            .then(() => {
                const LINTER_SLOW = 1000,
                    lint = require('mocha-eslint'),
                    paths = [ `**/*.js` ],
                    options = { slow: LINTER_SLOW };

                process.chdir(outputDir);
                lint(paths, options);
            });
    });

    it('creates files', function () {
        return helpers.run(generatorPath)
            .withPrompts({componentPath: 'testModule'})
            .then(() => {
                assert.file(fileList);
            });
    });

    describe('generated module', function () {
        const providerPath = 'app/test-module/provider.js';

        it('uses the correct provider name', function () {
            return helpers.run(generatorPath)
                .withPrompts({componentPath: 'testModule'})
                .then(() => {
                    assert.fileContent(providerPath, /class TestModuleProvider \{/);
                });
        });

        it('uses the provider decorator', function () {
            return helpers.run(generatorPath)
                .withPrompts({componentPath: 'testModule'})
                .then(() => {
                    assert.fileContent(providerPath, /@provider/);
                });
        });
    });
});

describe('genreator-angular-bro:provider test-module', function () {
    it('creates files', function () {
        return helpers.run(generatorPath)
            .withArguments([ 'test-module' ])
            .then(() => {
                assert.file(fileList);
            });
    });
});
