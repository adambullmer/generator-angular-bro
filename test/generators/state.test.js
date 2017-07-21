const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    generatorPath = path.join(__dirname, '../../generators/state'),
    fileList = [
        'app/test-module/state.js',
        'app/test-module/template.html',
        'tests/unit/test-module/state.spec.js',
    ];

describe('generator-angular-bro:state', function () {
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

    describe('generated state', function () {
        const statePath = 'app/test-module/state.js';

        it('uses the correct state controller name', function () {
            return helpers.run(generatorPath)
                .withPrompts({ componentPath: 'testModule' })
                .then(() => {
                    assert.fileContent(statePath, /class TestModuleState \{/);
                });
        });

        it('uses the correct state name', function () {
            return helpers.run(generatorPath)
                .withPrompts({ componentPath: 'testModule' })
                .then(() => {
                    assert.fileContent(statePath, /@state\('test-module'\, \{\}\)/);
                });
        });
    });
});

describe('genreator-angular-bro:state test-module', function () {
    it('creates files', function () {
        return helpers.run(generatorPath)
            .withArguments([ 'test-module' ])
            .then(() => {
                assert.file(fileList);
            });
    });
});
