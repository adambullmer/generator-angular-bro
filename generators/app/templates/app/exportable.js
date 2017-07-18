import angular from 'angular';
import 'app/router';
import 'app/scripts/templates';
import decoratorsModule from 'app/decorators';

export default angular.module('<%= appName %>', [
    'ui.router',
    'templates-app',
    decoratorsModule.name,
]);
