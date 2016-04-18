'use strict';
var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    deps = [
        [helpers.createDummyGenerator(), 'angular-bro:module']
    ];

describe('generator-angular-bro:factory', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/factory'))
            .withPrompts({componentPath: 'testModule'})
            .withGenerators(deps)
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'app/test-module/factory.js',
            'app/test-module/module.js',
            'tests/unit/test-module/factory.spec.js'
        ]);
    });

    describe('generated module', function () {
        var modulePath = 'app/test-module/module.js';

        it('imports the factory', function () {
            assert.fileContent(modulePath, /import \{ factory \} from 'app\/test-module\/factory';/);
        });

        it('uses the factory', function () {
            assert.fileContent(modulePath, /.factory\('testModuleFactory', factory\)/);
        });
    });
});
