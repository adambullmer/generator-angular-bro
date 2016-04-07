import 'app/<%= componentPath %>/module';

describe('<%= classComponentName %> <%= componentType %>', function () {
    'use strict';

    var $factory;

    beforeEach(module('<%= componentName %>'));

    beforeEach(inject(function (_<%= componentName %>Factory_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $factory = _<%= componentName %>Factory_;
    }));

    it('exists', inject(function () {
        expect($factory).toBeDefined();
    }));
});
