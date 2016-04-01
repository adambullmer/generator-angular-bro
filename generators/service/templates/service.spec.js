import 'app/<%= componentPath %>/module';

describe('<%= classComponentName %> <%= componentType %>', function () {
    'use strict';

    var $service;

    beforeEach(module('<%= componentName %>'));

    beforeEach(inject(function (_<%= classComponentName %>_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $service = _<%= classComponentName %>_;
    }));

    it('exists', inject(function () {
        expect($service).toBeDefined();
    }));
});
