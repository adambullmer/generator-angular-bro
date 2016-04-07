import 'app/<%= componentPath %>/module';

describe('<%= classComponentName %> <%= componentType %>', function () {
    'use strict';

    var $service;

    beforeEach(module('<%= componentName %>'));

    beforeEach(inject(function (_<%= classComponentName %>Service_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $service = _<%= classComponentName %>Service_;
    }));

    it('exists', inject(function () {
        expect($service).toBeDefined();
    }));
});
