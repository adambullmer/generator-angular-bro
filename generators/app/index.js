var generators = require('yeoman-generator'),
    _          = require('underscore.string');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.appName = _.camelize(this.appname.replace('.', '-'));
        this.hyphenName = _.dasherize(this.appName);
        this.friendlyAppName = _.titleize(_.humanize(this.appName));
    },

    ask: function () {
        var done = this.async(),
            prompts = [{
                type: 'input',
                name: 'appName',
                message: 'name',
                default: this.hyphenName
            }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName.replace('.', '-');
            this.appName = _.camelize(this.appName);
            this.hyphenName = _.dasherize(this.appName);
            this.friendlyAppName = _.titleize(_.humanize(this.appName));

            done();
        }.bind(this));
    },

    writing: {
        root: function () {
            this.fs.copy(
                this.templatePath('.babelrc'),
                this.destinationPath('.babelrc')
            );

            this.fs.copy(
                this.templatePath('.eslintrc'),
                this.destinationPath('.eslintrc')
            );

            this.fs.copyTpl(
                this.templatePath('bower.json'),
                this.destinationPath('bower.json'),
                this
            );

            this.fs.copyTpl(
                this.templatePath('Brocfile.js'),
                this.destinationPath('Brocfile.js'),
                this
            );

            this.fs.copy(
                this.templatePath('circle.yml'),
                this.destinationPath('circle.yml')
            );

            this.fs.copy(
                this.templatePath('Gruntfile.js'),
                this.destinationPath('Gruntfile.js')
            );

            this.fs.copy(
                this.templatePath('karma.conf.js'),
                this.destinationPath('karma.conf.js')
            );

            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'),
                this
            );
        },

        app: function () {
            this.fs.copyTpl(
                this.templatePath('app/app.js'),
                this.destinationPath('app/app.js'),
                this
            );

            this.fs.copyTpl(
                this.templatePath('app/index.html'),
                this.destinationPath('app/index.html'),
                this
            );

            this.fs.copyTpl(
                this.templatePath('app/router.js'),
                this.destinationPath('app/router.js'),
                this
            );

            this.fs.copyTpl(
                this.templatePath('app/exportable.js'),
                this.destinationPath('app/' + this.hyphenName + '.js'),
                this
            );
        },

        assets: function () {
            this.fs.copy(
                this.templatePath('assets/.gitkeep'),
                this.destinationPath('assets/.gitkeep')
            );
        },

        config: function () {
            this.fs.copy(
                this.templatePath('config/environment.js'),
                this.destinationPath('config/environment.js')
            );
        },

        styles: function () {
            this.fs.copy(
                this.templatePath('styles/app.less'),
                this.destinationPath('styles/app.less')
            );

            this.fs.copy(
                this.templatePath('styles/_colors.less'),
                this.destinationPath('styles/_colors.less')
            );

            this.fs.copy(
                this.templatePath('styles/_mixins.less'),
                this.destinationPath('styles/_mixins.less')
            );

            this.fs.copy(
                this.templatePath('styles/_variables.less'),
                this.destinationPath('styles/_variables.less')
            );
        },

        tests: function () {
            this.fs.copy(
                this.templatePath('tests/.eslintrc'),
                this.destinationPath('tests/.eslintrc')
            );

            this.fs.copy(
                this.templatePath('tests/e2e/.gitkeep'),
                this.destinationPath('tests/e2e/.gitkeep')
            );

            this.fs.copy(
                this.templatePath('tests/helpers/afterAll.js'),
                this.destinationPath('tests/helpers/afterAll.js')
            );

            this.fs.copy(
                this.templatePath('tests/helpers/beforeAll.js'),
                this.destinationPath('tests/helpers/beforeAll.js')
            );

            this.fs.copy(
                this.templatePath('tests/unit/.gitkeep'),
                this.destinationPath('tests/unit/.gitkeep')
            );
        }
    },

    end: function () {
        this.installDependencies();
    }
});
