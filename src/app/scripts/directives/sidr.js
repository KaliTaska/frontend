'use strict';

// http://www.berriart.com/sidr/
angular.module('app').directive('sidr', function() {
    return {
        link: function($scope, $element, attrs) {
            $element.sidr({
                source: attrs.source
            });
        }
    }
});