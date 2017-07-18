// eslint-disable-next-line no-unused-vars
import { state, inject } from 'app/decorators';

@state('<%= componentPath %>', {})
@inject()
export default class <%= classComponentName %>State {
    constructor () { }
}
