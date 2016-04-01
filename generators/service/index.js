var baseComponent      = require('../../lib/base-component'),
    generators         = require('yeoman-generator'),
    extend             = require('extend'),
    generator;

generator = extend(true, {}, baseComponent, {
    componentType: 'Service',

    writing: {
        module: function () {
            this.composeWith('angular-bro:module', {
                args: [this.componentPath],
                options: {
                    fromService: true,
                }
            }, {
                link: 'weak'
            });
        }
    }
});

module.exports = generators.Base.extend(generator);
