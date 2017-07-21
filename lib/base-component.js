const Generator = require('yeoman-generator'),
    parseComponentName = require('./parse-component-name'),
    _ = require('underscore.string');

module.exports = class extends Generator {
    constructor (args, opts) {
        super(args, opts);

        this.argument('componentPath', {
            type: String,
            desc: `${this.componentType} path and name (e.g. 'user' or a nested 'account/user')`,
            required: false,
        });
    }

    _initializing () {
        this.generateTest = true;
        this.props = {};

        if (this.options.componentPath !== undefined) {
            this._assignProps(this.options);
        }
    }

    _prompting () {
        const prompts = [{
            type: 'input',
            name: 'componentPath',
            message: `${this.componentType} name`,
            validate: (componentPath) => {
                if (!componentPath) {
                    return `${this.componentType} name is required`;
                }

                return true;
            }
        }];

        if (this.componentName !== undefined) {
            return;
        }

        return this.prompt(prompts).then(this._assignProps.bind(this), () => {});
    }

    _assignProps (props) {
        this.componentPath = props.componentPath;
        this.componentPath = _.dasherize(this.componentPath);

        this.componentName = parseComponentName.call(this, this.componentPath);

        this.hyphenComponentName = _.dasherize(this.componentName);

        this.classComponentName = _.classify(this.componentName);
        this.componentName = _.camelize(this.componentName);
    }

    _component () {
        const componentLowerCase = this.componentType.toLowerCase();

        this.fs.copyTpl(
            this.templatePath(`${componentLowerCase}.js`),
            this.destinationPath(`app/${this.componentPath}/${componentLowerCase}.js`),
            this
        );
    }

    _componentTest () {
        const componentLowerCase = this.componentType.toLowerCase();

        this.fs.copyTpl(
            this.templatePath(`${componentLowerCase}.spec.js`),
            this.destinationPath(`tests/unit/${this.componentPath}/${componentLowerCase}.spec.js`),
            this
        );
    }

    _template () {
        this.fs.copyTpl(
            this.templatePath(`template.html`),
            this.destinationPath(`app/${this.componentPath}/template.html`),
            this
        );
    }
};
