// To use it create some files under `routes/`
// e.g. `server/routes/users.js`
//
// module.exports = function(app) {
//   app.get('/users', function(req, res) {
//     res.send('hello');
//   });
// };

module.exports = function (app, config) {
    var globSync = require('glob').sync,
        mocks    = globSync('./mocks/**/*.js',   { cwd: __dirname }).map(require),
        proxies  = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require),
        morgan   = require('morgan');

    app.use(morgan('dev'));

    // Enable mock data
    mocks.forEach(function (route) { route(app); });
    // Enable proxies
    proxies.forEach(function (route) { route(app); });
};
