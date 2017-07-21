const path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    generatorPath = path.join(__dirname, '../../generators/template'),
    fileList = [
        'app/test-module/template.html',
    ];

describe('generator-angular-bro:template', function () {
    it('creates files', function () {
        return helpers.run(generatorPath)
            .withPrompts({componentPath: 'testModule'})
            .then(() => {
                assert.file(fileList);
            });
    });
});

describe('genreator-angular-bro:template test-module', function () {
    it('creates files', function () {
        return helpers.run(generatorPath)
            .withArguments([ 'test-module' ])
            .then(() => {
                assert.file(fileList);
            });
    });
});
