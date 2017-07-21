const Base = require('../../lib/base-component');

module.exports = class extends Base {
    initializing () {
        this._initializing();
        this.componentType = 'Template';
    }

    prompting () {
        return this._prompting();
    }

    default () {
        this._template();
    }
};
