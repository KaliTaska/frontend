angular.module('app')
.controller('PlayerCtrl', function ($scope, $interval, Player) {
    $scope.test321 = 4321;

    var TICK = 1000,
    player = $scope.player = new Player();

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
            play: function() {
                player.startTrack();
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
        $scope.playlist = player.playlist;

    }

    $scope.win = function() {
        $scope.isWin = true;
    }
    

    init();
});
