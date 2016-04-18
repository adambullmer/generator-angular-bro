'use strict';
var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    deps = [
        [helpers.createDummyGenerator(), 'angular-bro:module'],
        [helpers.createDummyGenerator(), 'angular-bro:controller'],
        [helpers.createDummyGenerator(), 'angular-bro:template']
    ];

describe('generator-angular-bro:directive', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/directive'))
            .withPrompts({componentPath: 'testModule'})
            .withGenerators(deps)
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'app/test-module/directive.js'
            // 'app/test-module/controller.js',
            // 'app/test-module/module.js',
            // 'app/test-module/template.html'
        ]);
    });
});
