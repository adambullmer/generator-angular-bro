const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

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
        assert.file([
            'app/test-module/provider.js',
            'app/test-module/module.js',
            'tests/unit/test-module/provider.spec.js'
        ]);
    });

    describe('generated module', function () {
        const modulePath = 'app/test-module/module.js';

        it('imports the provider', function () {
            assert.fileContent(modulePath, /import \{ provider \} from 'app\/test-module\/provider';/);
        });

        it('uses the provider', function () {
            assert.fileContent(modulePath, /.provider\('testModule', provider\)/);
        });
    });
});
