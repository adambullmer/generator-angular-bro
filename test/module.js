'use strict';
var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('generator-angular-bro:module', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/module'))
            .withPrompts({componentPath: 'testModule'})
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'app/test-module/module.js'
        ]);
    });
});
