import 'app/<%= componentPath %>/module';
import app from 'app/<%= hyphenComponentName %>';

describe('<%= classComponentName %> <%= componentType %>', function () {
    let $controller;

    beforeEach(module(app.name));

    beforeEach(inject(function (_<%= classComponentName %>Controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$<%= classComponentName %>Controller_;
    }));

    it('exists', inject(function ($controller) {
        expect($controller).toBeDefined();
    }));
});
