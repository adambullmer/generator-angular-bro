module.exports = function (app) {
    var express = require('express'),
    router  = express.Router();

    router.get('/', function (req, res) {
        res.send({
            '<%= componentName %>': []
        });
    });

    router.post('/', function (req, res) {
        res.status(201).end();
    });

    router.get('/:id', function (req, res) {
        res.send({
            '<%= componentName %>': {
                id: req.params.id
            }
        });
    });

    router.put('/:id', function (req, res) {
        res.send({
            '<%= componentName %>': {
                id: req.params.id
            }
        });
    });

    router.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    // The POST and PUT call will not contain a request body
    // because the body-parser is not included by default.
    // To use req.body, run:

    //    npm install --save-dev body-parser

    // After installing, you need to `use` the body-parser for
    // this mock uncommenting the following line:
    //
    // app.use('/api/<%= componentName %>', require('body-parser').json());
    app.use('/api/<%= componentName %>', router);
};
