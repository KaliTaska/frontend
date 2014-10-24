'use strict';

angular.module('app')
    .factory('Player', function ($interval, ngAudio) {
        var TICK = 1000,
            TIME_SCALE = 1;

        function Player() {

            this.playlist = [
                {"Tasks": [], "Id": 1, "Name": "Be cool!", "Description": "Rule it!", "Start": "2014-10-11T14:58:06.427", "EstimatedDurationSecs": 160000, "IsInPlay": false, "IsActive": false, "ShowNext": false, "ShowNotification": false, "HasChildren": false},
                {"Tasks": [
                    {"Tasks": [], "Id": 3, "Name": "Introduction", "Description": "Intrdouctions. Short review of the concept.", "Start": "2014-10-11T14:58:06.427", "EstimatedDurationSecs": 60000, "IsInPlay": false, "IsActive": false, "ShowNext": false, "ShowNotification": false, "HasChildren": false},
                    {"Tasks": [], "Id": 4, "Name": "Say something awesome", "Description": "Now say something cool to own them!", "Start": "2014-10-11T15:00:06.427", "EstimatedDurationSecs": 460000, "IsInPlay": false, "IsActive": false, "ShowNext": false, "ShowNotification": true, "HasChildren": false},
                    {"Tasks": [], "Id": 5, "Name": "Be cool!", "Description": "Just Do It!", "Start": "2014-10-11T15:03:26.427", "EstimatedDurationSecs": 60000, "IsInPlay": false, "IsActive": false, "ShowNext": false, "ShowNotification": false, "HasChildren": false}
                ], "Id": 2, "Name": "Start Presentation", "Description": "Start Presentation on Kalitaska software", "Start": "2014-10-11T14:58:06.427", "EstimatedDurationSecs": 60000, "IsInPlay": false, "IsActive": false, "ShowNext": false, "ShowNotification": false, "HasChildren": true},
                {"Tasks": [], "Id": 3, "Name": "Introduction", "Description": "Intrdouctions. Short review of the concept.", "Start": "2014-10-11T14:58:06.427", "EstimatedDurationSecs": 60000, "IsInPlay": false, "IsActive": false, "ShowNext": false, "ShowNotification": false, "HasChildren": false},
                {"Tasks": [], "Id": 4, "Name": "Say something awesome", "Description": "Now say something cool to own them!", "Start": "2014-10-11T15:00:06.427", "EstimatedDurationSecs": 60000, "IsInPlay": false, "IsActive": false, "ShowNext": false, "ShowNotification": true, "HasChildren": false},
                {"Tasks": [], "Id": 5, "Name": "Rule the world", "Description": "Just Do It!", "Start": "2014-10-11T15:03:26.427", "EstimatedDurationSecs": 260000, "IsInPlay": false, "IsActive": false, "ShowNext": false, "ShowNotification": false, "HasChildren": false}
            ];
        }

        angular.extend(Player.prototype, {
            index: -1,
            playlist: [],
            time: 0,
            stop: false,
            isPlaying: false,
            percent: 0,
            isAutoNext: false,
            startTrack: function (track) {
                this.stopTrack();
                // Если передан трек и он не равен текузщуму,
                if (track && this.track != track) {
                    // Находим его иодекс и обновляем данные
                    this.index = this.playlist.indexOf(track);
                    if (this.index > -1) {
                        this.track = track;
                    }
                    else {
                        this.track = false;
                    }
                }


                var self = this;

                if (!self.track) {
                    self.nextTrack();
                }

                // Время, сколько нужно играть задачу.
                // Если затраченное время больше уже пройденного,
                // это значит, что задача пошла на круг n
                // найдём количество завершённых кругов,
                var circle = Math.floor(self.track.DurationSecs / self.track.EstimatedDurationSecs);
                // отнимеме от всего затраченного времени законченных кругов
                self.time = self.track.DurationSecs - self.track.EstimatedDurationSecs * circle;
                // и запустим таймер на время до завершения круга.
                self.time = self.track.EstimatedDurationSecs - self.time;
                console.log(self.time, circle, self.track.DurationSecs, self.track.EstimatedDurationSecs);
//                    return false;

                self.time = self.time || self.track.EstimatedDurationSecs;

                self.stop = $interval(
                    function () {
                        self.onTick();
                    },
                        TICK / 1,
                    Math.round(self.time / TIME_SCALE)
                );
                self.onTick(true);

                self.stop.then(function () {
                    var sound = ngAudio.play("assets/beep.mp3");

                    self.stopTrack();
                    if (self.isAutoNext) {
                        self.nextTrack();
                        self.startTrack();
                    }
                });

                self.isPlaying = true;

            },
            onTick: function (isSilent) {
                this.percent = Math.ceil(100 - this.time / this.track.EstimatedDurationSecs * 100);
                if (!isSilent) {

                    this.track.DurationSecs = this.track.DurationSecs || 0;
                    this.track.DurationSecs += TIME_SCALE;
                    this.time -= TIME_SCALE;
                }
            },
            stopTrack: function () {
                if (this.isPlaying) {

                    $interval.cancel(this.stop);
                    this.isPlaying = false;
                }

            },
            nextTrack: function () {
                this.stopTrack();
                if (this.playlist[this.index + 1]) {
                    this.track = this.playlist[++this.index];
                    this.time = this.track.EstimatedDurationSecs;
                }
            },
            prevTrack: function () {
                this.stopTrack();
                if (this.playlist[this.index - 1]) {
                    this.track = this.playlist[--this.index];
                    this.time = this.track.EstimatedDurationSecs;
                }
            }
        });

        return Player;
    });