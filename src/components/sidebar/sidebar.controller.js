/**
 * Created with IntelliJ IDEA.
 * User: joycollector
 * Date: 24.10.14
 * Time: 7:53
 */
'use strict';

angular.module('app').controller('SidebarCtrl', ['$scope', function ($scope) {
    $scope.tasklists = [{"Tasks":[{"TimeEntries":[{"Id":1,"Begin":"2014-10-23T23:56:52.4","End":"2014-10-23T23:56:57.347","TaskaId":1,"IsActive":false}],"Id":1,"Name":"Start Presentation","Description":"Start presentation. Surprise everybody. Be awesome.","EstimatedDurationSecs":120,"DurationSecs":5,"IsActive":true},{"TimeEntries":[],"Id":2,"Name":"Introduction","Description":"Intrdouctions. Short review of the concept of KaliTaska.","EstimatedDurationSecs":360,"DurationSecs":0,"IsActive":true},{"TimeEntries":[],"Id":3,"Name":"Be cool!","Description":"Just Do It!","EstimatedDurationSecs":9999,"DurationSecs":0,"IsActive":true}],"Id":1,"Name":"Kalilaska Presentaion List","Price":0.00,"IsPremium":false},{"Tasks":[{"TimeEntries":[],"Id":4,"Name":"Introduction","Description":"Well, we have quite a simple interface, so just click here and there... You'll get used to it, I asure you.","EstimatedDurationSecs":120,"DurationSecs":0,"IsActive":true}],"Id":2,"Name":"KaliTaska Tutorial","Price":0.00,"IsPremium":false}];
}]);
