const generators         = require('yeoman-generator'),
    parseComponentName = require('../../lib/parse-component-name'),
    _                  = require('underscore.string');

module.exports = generators.Base.extend({
    componentType: 'Provider',
    generateTest: true,

    constructor: function () {
        generators.Base.apply(this, arguments);

        this.argument('componentPath', {
            type: String,
            desc: `${this.componentType} path and name (e.g. 'user' or a nested 'account/user')`,
            required: false,
        });

        if (this.componentPath !== undefined) {
            this.componentPath = _.dasherize(this.componentPath);

            this.componentName = parseComponentName.call(this, this.componentPath);

            this.hyphenComponentName = _.dasherize(this.componentName);

            this.classComponentName = _.classify(this.componentName);
            this.componentName = _.camelize(this.componentName);
        }
    },

    ask: function () {
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
        let done = null;

        if (this.componentName !== undefined) {
            return;
        }

        done = this.async();
        this.prompt(prompts, (props) => {
            this.componentPath = props.componentPath;
            this.componentPath = _.dasherize(this.componentPath);

            this.componentName = parseComponentName.call(this, this.componentPath);

            this.hyphenComponentName = _.dasherize(this.componentName);

            this.classComponentName = _.classify(this.componentName);
            this.componentName = _.camelize(this.componentName);

            done();
        });
    },

    writing: {
        component: function () {
            const componentLowerCase = this.componentType.toLowerCase();

            this.fs.copyTpl(
                this.templatePath(`${componentLowerCase}.js`),
                this.destinationPath(`app/${this.componentPath}/${componentLowerCase}.js`),
                this
            );
        },

        componentTest: function () {
            const componentLowerCase = this.componentType.toLowerCase();

            if (this.generateTest === false) {
                return;
            }

            this.fs.copyTpl(
                this.templatePath(`${componentLowerCase}.spec.js`),
                this.destinationPath(`tests/unit/${this.componentPath}/${componentLowerCase}.spec.js`),
                this
            );
        }
    }
});
