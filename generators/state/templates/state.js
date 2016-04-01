import { controller } from 'app/<%= componentPath %>/controller';

function State ($stateProvider) {
    'use strict';
    'ngInject';

    $stateProvider.state('<%= componentPath %>', {
        url: '/<%= componentPath %>',
        templateUrl: '<%= componentPath %>/template.html',
        controller: controller
    });
}

exports.state = State;
