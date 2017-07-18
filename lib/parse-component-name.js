/**
 * To be called in context of a generator instance.
 *
 * @param  {String} componentPath path to parse name from
 *
 * @returns {String} component name
 */
module.exports = function (componentPath) {
    const pieces = componentPath.split('/');

    if (!componentPath || typeof componentPath !== 'string') {
        this.env.error(`Must provide the name of the ${this.componentType.toLowerCase()} to be created`);
    }

    return pieces.pop();
};
