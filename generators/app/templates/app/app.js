import angular from 'angular';
import 'app/router';
import <%= appName %>Module from 'app/<%= hyphenName %>';

var app = angular.module('app', [
    'router',
    <%= appName %>Module.name
]);

angular.element(document).ready(function () {
    angular.bootstrap(document, [
        app.name
    ], {
        strictDi: true
    });
});
