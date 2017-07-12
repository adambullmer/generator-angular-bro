var _                  = require('underscore.string'),
    generators         = require('yeoman-generator'),
    parseComponentName = require('../../lib/parse-component-name');

module.exports = generators.Base.extend({
    componentType: 'Provider',
    generateTest: true,

    constructor: function (/* componentPath, options */) {
        generators.Base.apply(this, arguments);

        this.argument('componentPath', {
            type: String,
            desc: this.componentType + ' path and name (e.g. `user` or a nested `account/user`)',
            required: false
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
        var prompts = [{
                type: 'input',
                name: 'componentPath',
                message: this.componentType + ' name',
                validate: function (componentPath) {
                    if (!componentPath) {
                        return this.componentType + ' name is required';
                    }

                    return true;
                }.bind(this)
            }],
            done;

        if (this.componentName !== undefined) {
            return;
        }

        done = this.async();
        this.prompt(prompts, function (props) {
            this.componentPath = props.componentPath;
            this.componentPath = _.dasherize(this.componentPath);

            this.componentName = parseComponentName.call(this, this.componentPath);

            this.hyphenComponentName = _.dasherize(this.componentName);

            this.classComponentName = _.classify(this.componentName);
            this.componentName = _.camelize(this.componentName);

            done();
        }.bind(this));
    },

    writing: {
        component: function () {
            var componentLowerCase = this.componentType.toLowerCase();

            this.fs.copyTpl(
                this.templatePath(componentLowerCase + '.js'),
                this.destinationPath('app/' + this.componentPath + '/' + componentLowerCase + '.js'),
                this
            );
        },

        componentTest: function () {
            var componentLowerCase = this.componentType.toLowerCase();

            if (this.generateTest === false) {
                return;
            }

            this.fs.copyTpl(
                this.templatePath(componentLowerCase + '.spec.js'),
                this.destinationPath('tests/unit/' + this.componentPath + '/' + componentLowerCase + '.spec.js'),
                this
            );
        },

        module: function () {
            this.composeWith('angular-bro:module', {
                args: [this.componentPath],
                options: {
                    fromProvider: true,
                }
            }, {
                local: require.resolve('../module'),
                link: 'weak'
            });
        }
    }
});


