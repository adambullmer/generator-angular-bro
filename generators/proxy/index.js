const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor (args, opts) {
        super(args, opts);
        this.componentType = 'Proxy';

        this.argument('proxyPath', {
            type: String,
            desc: `${this.componentType} relative path and name (e.g. '/user' or a nested '/account/user')`,
            required: false
        });

        this.argument('proxyTarget', {
            type: String,
            desc: `${this.componentType} target path and name (e.g. 'http://localhost/api/v1/user/')`,
            required: false
        });
    }

    initializing () {
        this.props = {};

        if (this.options.proxyPath !== undefined && this.options.proxyTarget !== undefined) {
            this._assignProps(this.options);
        }
    }

    prompting () {
        const prompts = [{
            type: 'input',
            name: 'proxyPath',
            message: `${this.componentType} Path`,
            validate: (proxyPath) => {
                if (!proxyPath) {
                    return `${this.componentType} path is required`;
                }

                return true;
            },
        }, {
            type: 'input',
            name: 'proxyTarget',
            message: `${this.componentType} Target`,
            validate: (proxyTarget) => {
                if (!proxyTarget) {
                    return `${this.componentType} target is required`;
                }

                return true;
            },
        }];

        if (this.proxyPath !== undefined && this.proxyTarget !== undefined) {
            return;
        }

        return this.prompt(prompts).then(this._assignProps.bind(this), () => {});
    }

    _assignProps (props) {
        this.proxyPath   = props.proxyPath;
        this.proxyTarget = props.proxyTarget;
    }

    default () {
        this.fs.copyTpl(
            this.templatePath('proxy.js'),
            this.destinationPath(`server/proxies/${this.proxyPath}.js`),
            this
        );
    }
};
