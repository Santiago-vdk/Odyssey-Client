var app = angular.module('odyssey', ['ngRoute']);


app.controller('Me', function ($scope, $http) {
    $scope.clickEvent = function (obj) {
        window.location = "#/profile/" + localStorage.username;
        window.location.reload();
    }

    $scope.currentUser = function () {
        return localStorage.username;
         
    };
    
    var dataJSON = {
        token: localStorage.token
    }

    $http({
        url: 'http://192.168.1.135:9080/OdysseyCloud/api/v1/users/me',
        method: 'POST',
        data: JSON.stringify(dataJSON),
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(function (data) {
        console.log("Success");
        $scope.me = data;
    });

    /*
    $http.get('http://192.168.1.135:9080/OdysseyCloud/api/v1/users/me').
    success(function (data) {
        $scope.me = data;
    });*/
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
/*
app.controller('Song', function ($scope, $http) {
    var songID = localStorage.viewingsong;

    $http.get('http://192.168.1.135:9080/OdysseyCloud/api/v1/users/1/libraries/1/songs/' + songID).
    success(function (data) {
        $scope.info = data;
    });

});
*/


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

    $scope.currentUser = function (lib_user) {
        if (lib_user == localStorage.username) {
            return true;
        } else {
            return false;
        }
    };

    $scope.changeVersion = function () {
        bootbox.dialog({
            title: "Rollback version",
            message: '<div class="row">  ' +
                '<div class="col-md-12"> ' +
                '<form class="form-horizontal"> ' +

                '<div class="form-group" style="padding:10px;">' +
                '<label for="sel1">Select a version to rollback:</label>' +
                '<select class="form-control" id="version">' +
                '<option>1</option>' +
                '<option>2</option>' +
                '<option>3</option>' +
                '<option>4</option>' +
                '</select>' +
                '</div>' +

                '<label>CANNOT UNDO!</label>' +


                '</div> </div>' +
                '</form> </div>  </div>',
            buttons: {
                success: {
                    label: "Rollback!",
                    className: "btn-danger",
                    callback: function () {

                    }
                }
            }
        });

    }

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

app.controller('CurrentlyPlayingCtrl', function ($scope) {
    $scope.song = $("#music-player").attr('data');

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
                    '<textarea id="lyrics" rows="20" type="text" class="form-control input-md">' + $scope.lyrics.lyrics + '</textarea>' + '</div> ' +
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

app.controller('UserMenuCtrl', function ($http, $scope) {
    $scope.changePassword = function () {
        var $current_user = localStorage.username;
        bootbox.dialog({
            title: "Change password",
            message: '<div class="row">  ' +
                '<div class="col-md-12"> ' +
                '<form class="form-horizontal"> ' +


                '<div class="form-group"> ' +
                '<label class="col-md-4 control-label" for="name">Username</label> ' +
                '<div class="col-md-4"> ' +
                '<input id="name" name="name" type="text" class="form-control input-md" value="' + $current_user + '"readonly> ' +
                '<span class="help-block">Yup! We know you ;)</span> </div> ' +
                '</div> ' +

                '<div class="form-group"> ' +
                '<label class="col-md-4 control-label" for="name">Old password</label> ' +
                '<div class="col-md-4"> ' +
                '<input id="old_password" name="old_password" type="password" placeholder="Your current password" class="form-control input-md"> ' +

                '</div> ' + '</div>' +

                '<div class="form-group"> ' +
                '<label class="col-md-4 control-label" for="name">New password</label> ' +
                '<div class="col-md-4"> ' +
                '<input id="new_password" name="new_password" type="password" placeholder="4 digits minimum" class="form-control input-md"> ' +

                '</div> ' + '</div>' +


                '</div> </div>' +
                '</form> </div>  </div>',
            buttons: {
                success: {
                    label: "Save",
                    className: "btn-success",
                    callback: function () {
                        var name = $('#name').val();
                        var old_password = $('#old_password').val()
                        var new_password = $('#new_password').val()
                        changePassword(name,old_password,new_password);
                    }
                }
            }
        });

    }


    $scope.logoutAccount = function () {
        logout();
    }



    $scope.eraseAccount = function () {
        var $current_user = localStorage.username;
        bootbox.dialog({
            title: "Erase Account",
            message: '<div class="row">  ' +
                '<div class="col-md-12"> ' +
                '<form class="form-horizontal"> ' +

                '<div class="form-group"> ' +
                '<label class="col-md-4 control-label" for="name">Username</label> ' +
                '<div class="col-md-4"> ' +
                '<input id="name" name="name" type="text" placeholder="Username" class="form-control input-md"> ' +
                '<span class="help-block">Will miss you m8 :(</span> </div> ' +
                '</div> ' +

                '<div class="form-group"> ' +
                '<label class="col-md-4 control-label" for="name">Password confirmation</label> ' +
                '<div class="col-md-4"> ' +
                '<input id="password" name="password" type="password" placeholder="Password" class="form-control input-md"> ' +

                '</div> ' + '</div>' +

                '</div> </div>' +
                '</form> </div>  </div>',
            buttons: {
                success: {
                    label: "Erase my account!",
                    className: "btn-danger",
                    callback: function () {
                        var name = $('#name').val();
                        if (name != $current_user) {
                            alert("U wot m8");
                        } else {
                            var password = $('#password').val()
                            deleteAccount(name,password);
                        }
                        
                    }
                }
            }
        });

    }
});