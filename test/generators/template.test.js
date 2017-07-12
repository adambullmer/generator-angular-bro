const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('generator-angular-bro:template', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/template'))
            .withPrompts({componentPath: 'testModule'})
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'app/test-module/template.html'
        ]);
    });
});
