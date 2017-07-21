const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    generatorPath = path.join(__dirname, '../../generators/directive'),
    fileList = [
        'app/test-module/directive.js',
        'app/test-module/template.html',
        'tests/unit/test-module/directive.spec.js',
    ];

describe('generator-angular-bro:directive', function () {
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
        const modulePath = 'app/test-module/directive.js';

        it('uses the correct directive name', function () {
            return helpers.run(generatorPath)
                .withPrompts({ componentPath: 'testModule' })
                .then(function () {
                    assert.fileContent(modulePath, /class TestModule \{/);
                });
        });

        it('uses the directive decorator', function () {
            return helpers.run(generatorPath)
                .withPrompts({ componentPath: 'testModule' })
                .then(function () {
                    assert.fileContent(modulePath, /@directive\(/);
                });
        });
    });
});

describe('genreator-angular-bro:directive test-module', function () {
    it('creates files', function () {
        return helpers.run(generatorPath)
            .withArguments([ 'test-module' ])
            .then(function () {
                assert.file(fileList);
            });
    });
});
