var baseComponent      = require('../../lib/base-component'),
    generators         = require('yeoman-generator'),
    extend             = require('extend'),
    generator;

generator = extend(true, {}, baseComponent, {
    componentType: 'Mock',
    generateTest: false,

    writing: {
        component: function () {
            this.fs.copyTpl(
                this.templatePath('mock.js'),
                this.destinationPath('server/mocks/' + this.componentPath + '.js'),
                this
            );
        }
    }
});

module.exports = generators.Base.extend(generator);
