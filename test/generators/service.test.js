const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    generatorPath = path.join(__dirname, '../../generators/service'),
    fileList = [
        'app/test-module/service.js',
        'tests/unit/test-module/service.spec.js',
    ];

describe('generator-angular-bro:service', function () {
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
        const modulePath = 'app/test-module/service.js';

        it('uses the correct service name', function () {
            return helpers.run(generatorPath)
                .withPrompts({ componentPath: 'testModule' })
                .then(() => {
                    assert.fileContent(modulePath, /class TestModuleService \{/);
                });
        });

        it('uses the service decorator', function () {
            return helpers.run(generatorPath)
                .withPrompts({ componentPath: 'testModule' })
                .then(() => {
                    assert.fileContent(modulePath, /@service/);
                });
        });
    });
});

describe('genreator-angular-bro:service test-module', function () {
    it('creates files', function () {
        return helpers.run(generatorPath)
            .withArguments([ 'test-module' ])
            .then(() => {
                assert.file(fileList);
            });
    });
});
