import 'app/<%= componentPath %>/module';

describe('<%= classComponentName %> <%= componentType %>', function () {
    'use strict';

    var $provider;

    beforeEach(module('<%= componentName %>'));

    beforeEach(function () {
        module(function (_<%= componentName %>Provider_) {
            $provider = _<%= componentName %>Provider_;
        });
    });

    beforeEach(inject());

    it('exists', inject(function () {
        expect($provider).toBeDefined();
    }));
});
