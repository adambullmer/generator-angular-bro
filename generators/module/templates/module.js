import angular from 'angular';
<% if (fromState === true) { -%>
import { state } from 'app/<%= componentPath %>/state';
<% } -%>
<% if (fromDirective === true) { -%>
import { directive } from 'app/<%= componentPath %>/directive';
<% } -%>
<% if (fromController === true) { -%>
import { controller } from 'app/<%= componentPath %>/controller';
<% } -%>
<% if (fromService === true) { -%>
import { service } from 'app/<%= componentPath %>/service';
<% } -%>
<% if (fromFactory === true) { -%>
import { factory } from 'app/<%= componentPath %>/factory';
<% } -%>
<% if (fromProvider === true) { -%>
import { provider } from 'app/<%= componentPath %>/provider';
<% } -%>

export default angular.module('<%= componentName %>', [])
<% if (fromState === true) { -%>
    .config(state)
<% } -%>
<% if (fromDirective === true) { -%>
    .directive('<%= componentName %>', directive)
<% } -%>
<% if (fromController === true) { -%>
    .controller('<%= classComponentName %>Ctrl', controller)
<% } -%>
<% if (fromService === true) { -%>
    .service('<%= classComponentName %>', service)
<% } -%>
<% if (fromFactory === true) { -%>
    .factory('<%= componentName %>', factory)
<% } -%>
<% if (fromProvider === true) { -%>
    .provider('<%= componentName %>', provider)
<% } -%>
; // Ends the module declaration
