import 'app/<%= componentPath %>/module';

describe('<%= classComponentName %> <%= componentType %>', function () {
    'use strict';

    var $provider;

    beforeEach(module('<%= componentName %>'));

    beforeEach(function () {
        module(function (<%= componentName %>Provider) {
            $provider = <%= componentName %>Provider;
        });
    });

    beforeEach(inject());

    it('exists', inject(function () {
        expect($provider).toBeDefined();
    }));
});
