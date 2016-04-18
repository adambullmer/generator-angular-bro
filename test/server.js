'use strict';
var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('generator-angular-bro:server', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/server')).on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'server/index.js',
            'server/mocks/.gitkeep',
            'server/proxies/.gitkeep'
        ]);
    });
});
