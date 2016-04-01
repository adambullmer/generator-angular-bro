var generators         = require('yeoman-generator'),
    parseComponentName = require('../../lib/parse-component-name');

module.exports = generators.Base.extend({
    componentType: 'Proxy',

    constructor: function () {
        generators.Base.apply(this, arguments);

        this.argument('proxyPath', {
            type     : String,
            desc     : this.componentType + ' relative path and name (e.g. `/user` or a nested `/account/user`)',
            required : false
        });

        this.argument('proxyTarget', {
            type     : String,
            desc     : this.componentType + ' target path and name (e.g. `http://localhost/api/v1/user/`)',
            required : false
        });

        if (this.componentPath !== undefined) {
            this.componentName = parseComponentName.call(this, this.componentPath);
        }
    },

    ask: function () {
        var prompts = [{
                type     : 'input',
                name     : 'componentPath',
                message  : this.componentType + ' name',
                validate : function (componentPath) {
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
            this.componentName = parseComponentName.call(this, props.componentPath);
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
        }
    }
});
