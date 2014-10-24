/**
 * Created with IntelliJ IDEA.
 * User: joycollector
 * Date: 24.10.14
 * Time: 7:53
 */
'use strict';

angular.module('app').controller('SidebarCtrl', ['$scope', 'taskLists', function ($scope, taskLists) {
    angular.extend($scope, {
        selectList : function () {
            alert(1);
        }
    });

    $scope.taskLists = taskLists.taskLists;
    $scope.count = 1;
}]);