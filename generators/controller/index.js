var baseComponent      = require('../../lib/base-component'),
    generators         = require('yeoman-generator'),
    extend             = require('extend'),
    generator;

generator = extend(true, {}, baseComponent, {
    componentType: 'Controller',
    fromDirective: false,
    fromState: false,

    writing: {
        module: function () {
            this.composeWith('angular-bro:module', {
                args: [this.componentPath],
                options: {
                    fromController: true,
                    fromState: this.fromState,
                    fromDirective: this.fromDirective
                }
            }, {
                link: 'weak'
            });
        }
    }
});

module.exports = generators.Base.extend(generator);
