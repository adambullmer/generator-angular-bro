const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    fileList = [
        'app/test-module/template.html',
    ];

describe('generator-angular-bro:template', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/template'))
            .withPrompts({componentPath: 'testModule'})
            .on('end', done);
    });

    it('creates files', function () {
        assert.file(fileList);
    });
});

describe('genreator-angular-bro:template test-module', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/template'))
            .withArguments('test-module')
            .on('end', done);
    });

    it('creates files', function () {
        assert.file(fileList);
    });
});
