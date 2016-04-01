import 'app/<%= componentPath %>/module';

describe('<%= classComponentName %> <%= componentType %>', function () {
    'use strict';

    var $provider;

    beforeEach(module('<%= componentName %>'));

    beforeEach(inject(function (_<%= componentName %>_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $provider = _<%= componentName %>_;
        console.log($provider);
    }));

    it('exists', inject(function () {
        expect($provider).toBeDefined();
    }));
});
