import 'app/<%= componentPath %>/module';

describe('<%= classComponentName %> <%= componentType %>', function () {
    'use strict';

    var $factory;

    beforeEach(module('<%= componentName %>'));

    beforeEach(inject(function (_<%= componentName %>_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $factory = _<%= componentName %>_;
    }));

    it('exists', inject(function () {
        expect($factory).toBeDefined();
    }));
});
