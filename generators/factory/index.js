var baseComponent      = require('../../lib/base-component'),
    generators         = require('yeoman-generator'),
    extend             = require('extend'),
    generator;

generator = extend(true, {}, baseComponent, {
    componentType: 'Factory',

    writing: {
        module: function () {
            this.composeWith('angular-bro:module', {
                args: [this.componentPath],
                options: {
                    fromFactory: true,
                }
            }, {
                link: 'weak'
            });
        }
    }
});

module.exports = generators.Base.extend(generator);
