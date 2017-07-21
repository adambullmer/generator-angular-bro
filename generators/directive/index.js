const Base = require('../../lib/base-component');

module.exports = class extends Base {
    initializing () {
        this._initializing();
        this.componentType = 'Directive';
    }

    prompting () {
        return this._prompting();
    }

    default () {
        this._component();
        this._componentTest();
        this._template();
    }
};
