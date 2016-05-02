var AngularApp = require('angular-bro-app'),
    app        = new AngularApp();

// Use `app.importScript` or `app.importStyle` to add additional
// libraries to the generated output files.
app.importScript('bower_components/angular-ui-router/release/angular-ui-router.js');

module.exports = app.toTree();
