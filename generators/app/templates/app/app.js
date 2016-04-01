import angular from 'angular';
import config from 'config/environment';
import 'app/scripts/templates';

var app = angular.module('<%= appName %>', [
    'templates-app'
]).config(function ($locationProvider) {
    "ngInject";
    "use strict";

    $locationProvider.html5Mode(config.html5Mode);
});

angular.element(document).ready(function () {
    angular.bootstrap(document, [
        app.name
    ], {
        strictDi: true
    });
});
