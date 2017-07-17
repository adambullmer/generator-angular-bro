const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('generator-angular-bro:proxy', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/proxy'))
            .withPrompts({
                proxyPath: 'testModule',
                proxyTarget: 'proxy/target'
            })
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
            'server/proxies/testModule.js'
        ]);
    });
});
