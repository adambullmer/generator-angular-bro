// eslint-disable-next-line no-unused-vars
import { config, inject } from 'app/decorators';

@config
@inject('$locationProvider')
export default class Router {
    constructor ($locationProvider) {
        $locationProvider.html5Mode(true);
    }
}
