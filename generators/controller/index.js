const Base = require('../../lib/base-component');

module.exports = class extends Base {
    constructor (args, opts) {
        super(args, opts);
    }

    initializing () {
        this._initializing();
        this.componentType = 'Controller';
    }

    prompting () {
        return this._prompting();
    }

    default () {
        this._component();
        this._componentTest();
    }
};
