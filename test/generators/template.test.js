const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('generator-angular-bro:template', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/template'))
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
            'app/test-module/template.html'
        ]);
    });
});
