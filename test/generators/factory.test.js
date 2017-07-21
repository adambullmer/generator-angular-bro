const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    generatorPath = path.join(__dirname, '../../generators/factory'),
    fileList = [
        'app/test-module/factory.js',
        'tests/unit/test-module/factory.spec.js',
    ];

describe('generator-angular-bro:factory', function () {
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
            .withPrompts({ componentPath: 'testModule' })
            .then(() => {
                assert.file(fileList);
            });
    });

    describe('generated module', function () {
        const modulePath = 'app/test-module/factory.js';

        it('uses the correct factory name', function () {
            return helpers.run(generatorPath)
                .withPrompts({ componentPath: 'testModule' })
                .then(() => {
                    assert.fileContent(modulePath, /class TestModuleFactory \{/);
                });
        });

        it('uses the factory decorator', function () {
            return helpers.run(generatorPath)
                .withPrompts({ componentPath: 'testModule' })
                .then(() => {
                    assert.fileContent(modulePath, /@factory/);
                });
        });
    });
});

describe('genreator-angular-bro:factory test-module', function () {
    it('creates files', function () {
        return helpers.run(generatorPath)
            .withArguments([ 'test-module' ])
            .then(() => {
                assert.file(fileList);
            });
    });
});
