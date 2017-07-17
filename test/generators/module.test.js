const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('generator-angular-bro:module', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/module'))
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
            'app/test-module/module.js'
        ]);
    });

    describe('generated module', function () {
        const modulePath = 'app/test-module/module.js';

        it('has the correct module name', function () {
            assert.fileContent(modulePath, /export default angular.module\('testModule', \[\]\)/);
        });

        it('returns a module definition', function () {
            assert.fileContent(modulePath, /export default angular.module\('(\w)+', \[\]\)\n/);
        });
    });
});
