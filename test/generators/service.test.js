const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('generator-angular-bro:service', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/service'))
            .withPrompts({componentPath: 'testModule'})
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'app/test-module/service.js',
            'app/test-module/module.js',
            'tests/unit/test-module/service.spec.js',
        ]);
    });

    describe('generated module', function () {
        const modulePath = 'app/test-module/module.js';

        it('imports the service', function () {
            assert.fileContent(modulePath, /import \{ service \} from 'app\/test-module\/service';/);
        });

        it('uses the service', function () {
            assert.fileContent(modulePath, /.service\('TestModuleService', service\)/);
        });
    });
});
