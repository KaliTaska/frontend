'use strict';

angular.module('app')
    .controller('PlayerCtrl', function ($scope, $interval, Player, taskLists) {
        var player = $scope.player = new Player();
        angular.extend(
            $scope,
            {
                STATE: '',
                DEFAULT: 'DEFAULT',
                PREVIEW: 'PREVIEW',
                showDesc: function(track) {
                    $scope.selectedTrack = track;
                },
                next: function() {
                    player.nextTrack();
                    player.startTrack();
                },
                prev: function() {
                    player.prevTrack();
                    player.startTrack();
                },
                play: function(track) {
                    player.startTrack(track);
                },
                stop: function() {
                    player.stopTrack();
                },
                selectTrack: function(track) {
                    if ($scope.selectedTrack && $scope.selectedTrack == track) {
                        $scope.selectedTrack = undefined;
                    }
                    else {
                        $scope.selectedTrack = track;
                    }
                }
            }
        );

        function init() {
            $scope.STATE = $scope.DEFAULT;
            $scope.playlist = player.playlist = taskLists.taskLists[taskLists.current].Tasks;
        }

        init();
    });
