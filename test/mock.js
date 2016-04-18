'use strict';
var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('generator-angular-bro:mock', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/mock'))
            .withPrompts({componentPath: 'testModule'})
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'server/mocks/test-module.js'
        ]);
    });
});
