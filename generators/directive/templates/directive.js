// eslint-disable-next-line no-unused-vars
import { directive, inject } from 'app/decorators';

@directive({
    restrict: 'AECM',
    templateUrl: '<%= componentPath %>/template.html',
})
@inject()
export default class <%= classComponentName %> {
    constructor () { }
}
