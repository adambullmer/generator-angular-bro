var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    default () {
        this.fs.copy(
            this.templatePath('index.js'),
            this.destinationPath('server/index.js')
        );

        this.fs.copy(
            this.templatePath('.gitkeep'),
            this.destinationPath('server/mocks/.gitkeep')
        );

        this.fs.copy(
            this.templatePath('.gitkeep'),
            this.destinationPath('server/proxies/.gitkeep')
        );
    }

    install () {
        this.npmInstall([ 'morgan@1.7.0' ], { saveDev: true });
    }
};
