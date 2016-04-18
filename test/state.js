'use strict';
var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    deps = [
        [helpers.createDummyGenerator(), 'angular-bro:controller'],
        [helpers.createDummyGenerator(), 'angular-bro:template'],
        [helpers.createDummyGenerator(), 'angular-bro:module']
    ];

describe('generator-angular-bro:state', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/state'))
            .withPrompts({componentPath: 'testModule'})
            .withGenerators(deps)
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'app/test-module/state.js'
            // 'app/test-module/controller.js',
            // 'app/test-module/module.js',
            // 'app/test-module/template.html'
        ]);
    });
});
