var app = angular.module('odyssey', ['ngRoute']);


app.controller('Me', function ($scope, $http) {
    $scope.clickEvent = function (obj) {
        localStorage.viewingprofile = localStorage.username;
        window.location = "#/profile";
        window.location.reload();
        console.log("here");
    }


    $http.get('http://192.168.1.135:9080/OdysseyCloud/api/v1/users/me').
    success(function (data) {
        $scope.me = data;
    });
});

/*
app.controller('Hello', function ($scope, $http, $attrs) {
    var userID = localStorage.viewingprofile;

    //Se modifica la solicitud para nostrar la info de otro usuario
    $http.get('http://192.168.1.135:9080/OdysseyCloud/api/v1/users/' + userID).
    success(function (data) {
        $scope.greeting = data;
    });

});*/

app.controller('Song', function ($scope, $http) {
    var songID = localStorage.viewingsong;

    $http.get('http://192.168.1.135:9080/OdysseyCloud/api/v1/users/1/libraries/1/songs/' + songID).
    success(function (data) {
        $scope.info = data;
    });

});



app.controller('RandomMessage', function ($scope, $http) {
    $http.get('http://api.icndb.com/jokes/random').
    success(function (data) {
        $scope.message = data;
    });
});

app.controller('Recomendations', function ($scope, $http) {
    $http({
        url: 'http://192.168.1.135:9080/OdysseyCloud/api/v1/tools/recomendations',
        method: 'POST',
        data: localStorage.query,
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        }
    }).
    success(function (data) {
        $scope.recomendations = data;
    });
});


app.controller('Search', function ($scope, $http) {
    $http({
        url: 'http://192.168.1.135:9080/OdysseyCloud/api/v1/tools/search',
        method: 'POST',
        data: localStorage.query,
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        }

    }).
    success(function (data) {
        $scope.search = data;
    });
});


app.config(function ($routeProvider) {
    $routeProvider
        .when('/dragged_songs', {
            templateUrl: './assets/pages/dragged_songs.html'
        })
        .when('/profile/:userid/', {
            templateUrl: './assets/pages/profile.html',
            controller: 'ProfileCtrl'
        })
        .when('/song_info/:userid/:libraryid/:songid', {
            templateUrl: './assets/pages/song_info.html',
            controller: 'SongCtrl'
        })
        .when('/search', {
            templateUrl: './assets/pages/search.html'
        })
        .when('/library/:userid/:libraryid', {
            templateUrl: './assets/pages/library.html',
            controller: 'LibraryCtrl'
        })
        .when('/news', {
            templateUrl: './assets/pages/news.html'
        })
        .otherwise({
            redirectTo: '/news'
        })
});



app.controller('ProfileCtrl', function ($routeParams, $http, $scope) {
    $scope.userid = $routeParams.userid;

    $http.get('http://192.168.1.135:9080/OdysseyCloud/api/v1/users/' + $scope.userid).
    success(function (data) {
        $scope.user = data;
    });
});

app.controller('LibraryCtrl', function ($routeParams, $http, $scope) {
    $scope.userid = $routeParams.userid;
    $scope.libraryid = $routeParams.libraryid;

    $http.get('http://192.168.1.135:9080/OdysseyCloud/api/v1/users/' + $scope.userid + '/libraries/' + $scope.libraryid + '?type=lib').
    success(function (data) {
        $scope.library = data;
    });
});


app.controller('SongCtrl', function ($routeParams, $http, $scope) {
    $scope.userid = $routeParams.userid;
    $scope.libraryid = $routeParams.libraryid;
    $scope.songid = $routeParams.songid;

    $http.get('http://192.168.1.135:9080/OdysseyCloud/api/v1/users/' + $scope.userid + '/libraries/1/songs/' + $scope.songid).
    success(function (data) {
        $scope.song = data;
    });
});

app.controller('LyricsCtrl', function ($http, $scope) {
    $scope.showLyrics = function (userid, songid) {

        $http.get('http://192.168.1.135:9080/OdysseyCloud/api/v1/users/' + userid + '/libraries/1/songs/' + songid).
        success(function (data) {
            $scope.lyrics = data;
            bootbox.dialog({
                title: "Edit lyrics:",
                message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +
                    '<div class="form-group"> ' +
                    '<textarea id="lyrics" rows="20" type="text" class="form-control input-md">' + $scope.lyrics.lyrics + '</textarea>' +
                    '</div> ' +
                    '</form> </div> </div> </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var new_lyrics = $('#lyrics').val();
                            console.log(new_lyrics);

                        }
                    }
                }
            });
        });


    }
});