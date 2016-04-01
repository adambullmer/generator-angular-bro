var baseComponent      = require('../../lib/base-component'),
    generators         = require('yeoman-generator'),
    extend             = require('extend'),
    generator;

generator = extend(true, {}, baseComponent, {
    componentType: 'Module',
    generateTest: false,
    fromState: false,
    fromDirective: false,
    fromController: false
});

module.exports = generators.Base.extend(generator);
