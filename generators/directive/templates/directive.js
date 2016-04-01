import { controller } from 'app/<%= componentPath %>/controller';

function Directive () {
    'use strict';
    'ngInject';

    return {

        restrict: 'AECM',
        templateUrl: '<%= componentPath %>/template.html',
        controller: controller

    };
}

exports.directive = Directive;
