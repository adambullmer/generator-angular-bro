const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('generator-angular-bro:state', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/state'))
            .withPrompts({componentPath: 'testModule'})
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'app/test-module/state.js',
            'app/test-module/controller.js',
            'app/test-module/module.js',
            'app/test-module/template.html',
            'tests/unit/test-module/controller.spec.js'
        ]);
    });

    describe('generated module', function () {
        const modulePath = 'app/test-module/module.js';

        it('imports the state', function () {
            assert.fileContent(modulePath, /import \{ state \} from 'app\/test-module\/state';/);
        });

        it('imports the controller', function () {
            assert.fileContent(modulePath, /import \{ controller \} from 'app\/test-module\/controller';/);
        });

        it('imports the template module', function () {
            assert.fileContent(modulePath, /import 'app\/scripts\/templates';/);
        });

        it('uses the state', function () {
            assert.fileContent(modulePath, /.config\(state\)/);
        });

        it('uses the controller', function () {
            assert.fileContent(modulePath, /.controller\('TestModuleCtrl', controller\)/);
        });

        it('uses the template cache', function () {
            assert.fileContent(modulePath, /\n    'templates-app'\n/);
        });
    });

    describe('generated state', function () {
        const statePath = 'app/test-module/state.js';

        it('uses the correct state name', function () {
            assert.fileContent(statePath, /\n        url: '\/test-module',\n/);
        });

        it('imports the controller', function () {
            assert.fileContent(statePath, /import \{ controller \} from 'app\/test-module\/controller';/);
        });

        it('uses the controller', function () {
            assert.fileContent(statePath, /        controller: controller/);
        });

        it('uses the generated template path', function () {
            assert.fileContent(statePath, /\n        templateUrl: 'test-module\/template.html',\n/);
        });
    });
});
