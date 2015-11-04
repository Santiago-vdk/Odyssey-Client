$(document).ready(function () {

    //Create Audiojs instance
    audiojs.events.ready(function () {
        audiojs.createAll();
    });


    $(function () {
        $(document).keyup(function (evt) {
            if (evt.keyCode == 32) {
                var music = $("#music-player");
                music.trigger('pause');

            }
        }).keydown(function (evt) {
            if (evt.keyCode == 32) {
            }
        }).keydown(function (evt) {
            if (evt.keyCode == 33) {

                var volume = $("#music-player").prop("volume") + 0.2;
                if (volume > 1) {
                    volume = 1;
                }
                $("#music-player").prop("volume", volume);
            }
        }).keydown(function (evt) {
            if (evt.keyCode == 34) {

                var volume = $("#music-player").prop("volume") - 0.2;
                if (volume < 0) {
                    volume = 0;
                }
                $("#music-player").prop("volume", volume);
            }
        });
    });


});