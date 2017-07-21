const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    generatorPath = path.join(__dirname, '../../generators/proxy'),
    fileList = [
        'server/proxies/testModule.js',
    ];

describe('generator-angular-bro:proxy', function () {
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
            .withPrompts({
                proxyPath: 'testModule',
                proxyTarget: 'proxy/target',
            })
            .then(() => {
                assert.file(fileList);
            });
    });
});

describe('genreator-angular-bro:proxy testModule proxy/target', function () {
    it('creates files', function () {
        return helpers.run(generatorPath)
            .withArguments([ 'testModule', 'proxy/target' ])
            .then(() => {
                assert.file(fileList);
            });
    });
});
