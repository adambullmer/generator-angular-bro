const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    generatorPath = path.join(__dirname, '../../generators/controller'),
    fileList = [
        'app/test-module/controller.js',
        'tests/unit/test-module/controller.spec.js',
    ];

describe('generator-angular-bro:controller', function () {
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
            .then(function () {
                assert.file(fileList);
            });
    });

    describe('generated module', function () {
        const modulePath = 'app/test-module/controller.js';

        it('uses the correct controller name', function () {
            return helpers.run(generatorPath)
                .withPrompts({ componentPath: 'testModule' })
                .then(function () {
                    assert.fileContent(modulePath, /class TestModuleController \{/);
                });
        });

        it('uses the controller decorator', function () {
            return helpers.run(generatorPath)
                .withPrompts({ componentPath: 'testModule' })
                .then(function () {
                    assert.fileContent(modulePath, /@controller/);
                });
        });
    });
});

describe('genreator-angular-bro:controller test-module', function () {
    it('creates files', function () {
        return helpers.run(generatorPath)
            .withArguments([ 'test-module' ])
            .then(function () {
                assert.file(fileList);
            });
    });
});
