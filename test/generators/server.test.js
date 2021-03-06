const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('generator-angular-bro:server', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/server'))
            .on('ready', function (gen) {
                gen.fs.writeJSON('package.json', {
                    devDependencies: {}
                });
            })
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'server/index.js',
            'server/mocks/.gitkeep',
            'server/proxies/.gitkeep'
        ]);
    });

    describe.skip('dependencies', function () {
        it('installs it\'s dependencies', function () {
            assert.jsonFileContent('package.json', {
                devDependencies: {
                    morgan: "1.7.0"
                }
            });
        });
    });
});
