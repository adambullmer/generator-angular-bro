import angular from 'angular';
import 'app/router';

var app = angular.module('<%= appName %>', [
    'router'
]);

angular.element(document).ready(function () {
    angular.bootstrap(document, [
        app.name
    ], {
        strictDi: true
    });
});
