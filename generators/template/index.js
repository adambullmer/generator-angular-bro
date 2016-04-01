var baseComponent      = require('../../lib/base-component'),
    generators         = require('yeoman-generator'),
    extend             = require('extend'),
    generator;

generator = extend(true, {}, baseComponent, {
    componentType: 'Template',
    generateTest: false,
    writing: {
        component: function () {
            var componentLowerCase = this.componentType.toLowerCase();

            this.fs.copyTpl(
                this.templatePath(componentLowerCase + '.html'),
                this.destinationPath('app/' + this.componentPath + '/' + componentLowerCase + '.html'),
                this
            );
        }
    }
});

module.exports = generators.Base.extend(generator);
