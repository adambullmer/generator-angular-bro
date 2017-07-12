const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('generator-angular-bro:controller', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/controller'))
            .withPrompts({componentPath: 'testModule'})
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'app/test-module/controller.js',
            'app/test-module/module.js',
            'tests/unit/test-module/controller.spec.js'
        ]);
    });

    describe('generated module', function () {
        var modulePath = 'app/test-module/module.js';

        it('imports the controller', function () {
            assert.fileContent(modulePath, /import \{ controller \} from 'app\/test-module\/controller';/);
        });

        it('uses the controller', function () {
            assert.fileContent(modulePath, /.controller\('TestModuleCtrl', controller\)/);
        });
    });
});
