const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    generatorPath = path.join(__dirname, '../../generators/app');

describe('generator-angular-bro:app', function () {

    after(function () {
        let outputDir = null;

        return helpers.run(generatorPath)
            .inTmpDir(function (tempDirectory) {
                outputDir = tempDirectory;
            })
            .withPrompts({ appName: 'testApp' })
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
            .withPrompts({ appName: 'testApp' }).then(function () {
                assert.file([
                    '.babelrc',
                    '.eslintrc',
                    'bower.json',
                    'Brocfile.js',
                    'circle.yml',
                    'Gruntfile.js',
                    'karma.conf.js',
                    'package.json',
                    'app/app.js',
                    'app/index.html',
                    'app/router.js',
                    'app/test-app.js',
                    'assets/.gitkeep',
                    'assets/.gitkeep',
                    'config/environment.js',
                    'styles/_colors.less',
                    'styles/_mixins.less',
                    'styles/_variables.less',
                    'styles/app.less',
                    'tests/.eslintrc',
                    'tests/e2e/.gitkeep',
                    'tests/helpers/beforeAll.js',
                    'tests/helpers/afterAll.js',
                    'tests/unit/.gitkeep',
                ]);
            });
    });

    describe('templates the app name', function () {
        it('app/app.js', function () {
            return helpers.run(generatorPath)
                .withPrompts({ appName: 'testApp' })
                .then(() => {
                    assert.fileContent('app/app.js', /\nimport testAppModule from 'app\/test-app';\n/);
                    assert.fileContent('app/app.js', /\[\s*testAppModule.name\s*\]/);
                });
        });

        it('app/exportable.js', function () {
            return helpers.run(generatorPath)
                .withPrompts({ appName: 'testApp' })
                .then(() => {
                    assert.fileContent('app/test-app.js', /\nexport default angular\.module\('testApp', \[\n/);
                });
        });

        it('bower.json', function () {
            return helpers.run(generatorPath)
                .withPrompts({ appName: 'testApp' })
                .then(() => {
                    assert.fileContent('bower.json', /\n  "name": "test-app",\n/);
                });
        });

        it('app/index.html', function () {
            return helpers.run(generatorPath)
                .withPrompts({ appName: 'testApp' })
                .then(() => {
                    assert.fileContent('app/index.html', /<title>Test App<\/title>\n/);
                });
        });

        it('package.json', function () {
            return helpers.run(generatorPath)
                .withPrompts({ appName: 'testApp' })
                .then(() => {
                    assert.fileContent('package.json', /\n  "name": "test-app",\n/);
                });
        });
    });
});
