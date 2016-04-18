var generators         = require('yeoman-generator');

module.exports = generators.Base.extend({
    componentType: 'Proxy',
    generateTest: false,

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
    },

    ask: function () {
        var prompts = [{
                type     : 'input',
                name     : 'proxyPath',
                message  : this.componentType + ' Path',
                validate : function (proxyPath) {
                    if (!proxyPath) {
                        return this.componentType + ' path is required';
                    }

                    return true;
                }.bind(this)
            }, {
                type     : 'input',
                name     : 'proxyTarget',
                message  : this.componentType + ' Target',
                validate : function (proxyTarget) {
                    if (!proxyTarget) {
                        return this.componentType + ' target is required';
                    }

                    return true;
                }.bind(this)
            }],
            done;

        if (this.proxyPath !== undefined) {
            return;
        }

        done = this.async();
        this.prompt(prompts, function (props) {
            this.proxyPath   = props.proxyPath;
            this.proxyTarget = props.proxyTarget;
            done();
        }.bind(this));
    },

    writing: {
        component: function () {
            this.fs.copyTpl(
                this.templatePath('proxy.js'),
                this.destinationPath('server/proxies/' + this.proxyPath + '.js'),
                this
            );
        }
    }
});
