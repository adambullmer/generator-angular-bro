'use strict';
var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    deps = [
        [helpers.createDummyGenerator(), 'angular-bro:module']
    ];

describe('generator-angular-bro:service', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/service'))
            .withPrompts({componentPath: 'testModule'})
            .withGenerators(deps)
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            // 'app/test-module/module.js',
            'app/test-module/service.js'
        ]);
    });
});
