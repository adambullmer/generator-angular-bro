import angular from 'angular';
import config from 'config/environment';

angular.module('router', [
    'ui.router'
])
.config(function ($locationProvider) {
    "ngInject";
    "use strict";

    $locationProvider.html5Mode(config.html5Mode);
});
