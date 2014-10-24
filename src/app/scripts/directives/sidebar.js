'use strict';

angular.module('app').directive('sidebar', function() {
    return {
        controller: function($scope) {
            $scope.barIsOpen = false;

            $scope.slideOpen = function() {
                $scope.barIsOpen = true;
            };

            $scope.slideClose = function() {
                $scope.barIsOpen = false;
            };

            $scope.slideToggle = function() {
                $scope.barIsOpen = ! $scope.barIsOpen;
            }
        }
    }
});