import angular from 'angular';
import <%= appName %>Module from 'app/<%= hyphenName %>';

const app = angular.module('app', [ <%= appName %>Module.name ]);

angular.element(document).ready(() => {
    angular.bootstrap(document, [ app.name ], { strictDi: true });
});

export default app;
