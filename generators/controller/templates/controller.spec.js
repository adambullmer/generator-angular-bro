import 'app/<%= componentPath %>/module';

describe('<%= classComponentName %> <%= componentType %>', function () {
    'use strict';

    var $controller;

    beforeEach(module('<%= componentName %>'));

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    it('exists', inject(function ($controller) {
        var controller = $controller('<%= classComponentName %>Ctrl', {
        });

        expect(controller).toBeDefined();
    }));
});
