const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    generatorPath = path.join(__dirname, '../../generators/server'),
    fileList = [
        'server/index.js',
        'server/mocks/.gitkeep',
        'server/proxies/.gitkeep',
    ];

describe('generator-angular-bro:server', function () {
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
            .on('ready', function (gen) {
                gen.fs.writeJSON('package.json', {
                    devDependencies: {}
                });
            })
            .then(() => {
                assert.file(fileList);
            });
    });

    describe.skip('dependencies', function () {
        it('installs it\'s dependencies', function () {
            return helpers.run(generatorPath)
                .withPrompts({componentPath: 'testModule'})
                .on('ready', function (gen) {
                    gen.fs.writeJSON('package.json', {
                        devDependencies: {}
                    });
                })
                .then(() => {
                    assert.jsonFileContent('package.json', {
                        devDependencies: {
                            morgan: "1.7.0"
                        }
                    });
                });
        });
    });
});
