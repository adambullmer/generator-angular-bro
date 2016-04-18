'use strict';
var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('generator-angular-bro:directive', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/directive'))
            .withPrompts({componentPath: 'testModule'})
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'app/test-module/directive.js',
            'app/test-module/controller.js',
            'app/test-module/module.js',
            'app/test-module/template.html',
            'tests/unit/test-module/directive.spec.js',
            'tests/unit/test-module/controller.spec.js'
        ]);
    });

    describe('generated module', function () {
        var modulePath = 'app/test-module/module.js';

        it('imports the directive', function () {
            assert.fileContent(modulePath, /import \{ directive \} from 'app\/test-module\/directive';/);
        });

        it('imports the controller', function () {
            assert.fileContent(modulePath, /import \{ controller \} from 'app\/test-module\/controller';/);
        });

        it('imports the template module', function () {
            assert.fileContent(modulePath, /import 'app\/scripts\/templates';/);
        });

        it('uses the directive', function () {
            assert.fileContent(modulePath, /.directive\('testModule', directive\)/);
        });

        it('uses the controller', function () {
            assert.fileContent(modulePath, /.controller\('TestModuleCtrl', controller\)/);
        });

        it('uses the template cache', function () {
            assert.fileContent(modulePath, /\n    'templates-app'\n/);
        });
    });

    describe('generated directive', function () {
        var directivePath = 'app/test-module/directive.js';

        it('imports the controller', function () {
            assert.fileContent(directivePath, /import \{ controller \} from 'app\/test-module\/controller';/);
        });

        it('uses the controller', function () {
            assert.fileContent(directivePath, /        controller: controller/);
        });

        it('uses the generated template path', function () {
            assert.fileContent(directivePath, /\n        templateUrl: 'test-module\/template.html',\n/);
        });
    });
});
