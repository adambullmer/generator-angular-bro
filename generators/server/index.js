var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
    },

    writing: {
        server: function () {
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
    },

    end: function () {
        this.npmInstall(['morgan@1.7.0'], { saveDev: true });
    }
});
