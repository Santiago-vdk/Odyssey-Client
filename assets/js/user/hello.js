var app = angular.module('odyssey', ['ngRoute']);

app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(true);
}]);

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
        url: localStorage.server + 'api/v1/users/me',
        method: 'POST',
        data: JSON.stringify(dataJSON),
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(function (data) {

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
    var json = {
        "username": localStorage.username
    }
    $http({
        url: localStorage.server + 'api/v1/tools/recomendations/?type=friends',
        method: 'POST',
        data: JSON.stringify(json),
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        }
    }).
    success(function (data) {
        $scope.recomendations = data;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
});


app.controller('Search', function ($scope, $http) {

    $http.get(localStorage.server + 'api/v1/tools/search/?query=' + localStorage.search).
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
        .when('/editor', {
            templateUrl: './assets/pages/library_editor.html'
        })
        .otherwise({
            redirectTo: '/news'
        })
});

app.controller('EditorCtrl', function ($scope, $timeout) {

    re_songs("1", function (result) {
        // console.log(result);
        $scope.library = result;
        localStorage["tempLib"] = JSON.stringify(result);
        $scope.$apply();
    });


    $scope.externalSync = function () {
        console.log("brainz");
        Brainz_Sync("1");
    };

});


app.controller('DragController', function ($scope) {
    $scope.library = JSON.parse(localStorage.data);

});


app.controller('ProfileCtrl', function ($routeParams, $http, $scope) {
    $scope.userid = $routeParams.userid;
    
    localStorage["currentUser"] = $scope.userid;

    $http.get(localStorage.server + 'api/v1/users/' + $scope.userid + '?type=profile').
    success(function (data) {
        $scope.user = data;
    });
});

app.controller('LibraryCtrl', function ($routeParams, $http, $scope) {
    $scope.userid = $routeParams.userid;
    $scope.libraryid = $routeParams.libraryid;

    localStorage["tempUser"] = $scope.userid;
    localStorage["templib"] = $scope.libraryid;

    $scope.currentUser = function (lib_user) {
        if (lib_user == localStorage.username) {
            return true;
        } else {
            return false;
        }
    };

    $scope.isFriend = function (lib_user) {
        //  return true;

        /* $http.get(localStorage.server + 'api/v1/users/' + localStorage.username + '/?type=friends&with=' + lib_user).
         success(function (data) {
             console.log(data.statusCode);
             return true;
         });*/
    }


    $scope.addFriend = function (lib_user) {
        //lib_user, due;o de la biblioteca que estoy viendo

        var dataJSON = {
            "username": localStorage.username,
            "token": localStorage.token,
            "friend": lib_user
        }
        $http({
            url: localStorage.server + 'api/v1/users/' + localStorage.username + '/?type=friend',
            method: 'PUT',
            data: JSON.stringify(dataJSON),
            dataType: "json",
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            console.log("New Friend Added!");
        });
    };

    $scope.deleteFriend = function (lib_user) {
        //lib_user, due;o de la biblioteca que estoy viendo

        var dataJSON = {
            "username": localStorage.username,
            "token": localStorage.token,
            "friend": lib_user
        }
        $http({
            url: localStorage.server + 'api/v1/users/' + localStorage.username + '?type=friend',
            method: 'DELETE',
            data: JSON.stringify(dataJSON),
            dataType: "json",
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            console.log("Friend removed!");
        });
    };

    $scope.changeVersion = function (songid) {

        $http.get(localStorage.server + 'api/v1/users/' + localStorage.username + '/libraries/1/songs/' + songid + '?data=version').
        success(function (data) {

            var options = '';
            data.forEach(function (entry) {

                options = options + '<option>' +
                    'Title:' + entry.title + ',' +
                    'Artist:' + entry.artist + ',' +
                    'Album:' + entry.album + ',' +
                    'Genre:' + entry.genre + ',' +
                    'Lyrics:' + entry.lyrics + ',' +
                    'Year:' + entry.lyrics + ',' +
                    'Version:' + entry.version + '</option>';

            });


            bootbox.dialog({
                title: "Rollback version",
                message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +

                    '<div class="form-group" style="padding:10px;">' +
                    '<label for="sel1">Select a version to rollback:</label>' +
                    '<select class="form-control" id="version">' +
                    options +
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
                            var vers = $("#version option:selected").text();
                            vers = vers.substring(vers.indexOf("Version:") + 8, vers.length);

                            var json = {
                                "version": vers
                            }

                            $http({
                                url: localStorage.server + 'api/v1/users/' + localStorage.username + '/libraries/1/songs/' + songid + '/?type=version',
                                method: 'PUT',
                                data: JSON.stringify(json),
                                dataType: "json",
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).success(function (data) {
                                console.log("Version updated!");
                            });


                        }
                    }
                }
            });


        });


    }



    localStorage.removeItem('friend');
    $http.get(localStorage.server + 'api/v1/users/' + localStorage.username + '/?type=friends&with=' + $scope.userid).
    success(function (data) {
        if (data.friends == true) {
            localStorage["friend"] = "true";
        }
        if (data.friends == false) {
            localStorage["friend"] = "false";
        }
    });

    $http.get(localStorage.server + 'api/v1/users/' + $scope.userid + '/libraries/' + $scope.libraryid + '?type=lib').
    success(function (data) {
        $scope.library = data;
    });
});


app.controller('AreWeFriendsCtrl', function ($routeParams, $http, $scope, $timeout) {
    $scope.friend = localStorage.friend;

});

app.controller('SongCtrl', function ($routeParams, $http, $scope) {
    $scope.userid = $routeParams.userid;
    $scope.libraryid = $routeParams.libraryid;
    $scope.songid = $routeParams.songid;

    $http.get(localStorage.server + 'api/v1/users/' + $scope.userid + '/libraries/1/songs/' + $scope.songid + '?data=social').
    success(function (data) {
        console.log(data);
        $scope.song = data;
    });


    $scope.streamSong = function (globalid, owner) {

        var endpoint = localStorage.server + 'api/v1/users/' + $scope.userid + '/libraries/1/songs/' + $scope.songid + '/stream/?for=' + localStorage.username;

        console.log("Hearing stream, " + endpoint);
        var audio = document.getElementById('music-player');


        //audio.setAttribute('data',"Playing song with ID: " + $scope.songid);

        audio.setAttribute('src', endpoint);
        audio.pause();
        audio.load(); //suspends and restores all audio element

        audio.play();

    }

    $scope.postComment = function (globalid, owner) {
        var comment = $('textarea#commenttext').val()

        var json = {
            "comment": comment,
            "fromUser": localStorage.username
        }
        $http({
            url: localStorage.server + 'api/v1/users/' + owner + '/libraries/1/songs/' + globalid + '/?type=comment',
            method: 'PUT',
            data: JSON.stringify(json),
            dataType: "json",
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            location.reload();
        });
    }

    $scope.likeSong = function (globalid, owner) {
        $http({
            url: localStorage.server + 'api/v1/users/' + owner + '/libraries/1/songs/' + globalid + '/?type=like',
            method: 'PUT',
            dataType: "json",
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            location.reload();
        });
    }

    $scope.dislikeSong = function (globalid, owner) {
        $http({
            url: localStorage.server + 'api/v1/users/' + owner + '/libraries/1/songs/' + globalid + '/?type=dislike',
            method: 'PUT',
            dataType: "json",
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            location.reload();
        });
    }


});

app.controller('CurrentlyPlayingCtrl', function ($scope) {
    $scope.song = $("#music-player").attr('data');

});

app.controller('FriendListCtrl', function ($http,$scope) {

    $http.get(localStorage.server + 'api/v1/users/' + localStorage.currentUser + '/?type=friendlist').
    success(function (data) {

        $scope.data = data;
    });


});




app.controller('LyricsCtrl', function ($http, $scope) {
    $scope.showLyrics = function (userid, songid) {
        console.log(songid);
        $http.get(localStorage.server + 'api/v1/users/' + userid + '/libraries/1/songs/' + songid + '?data=lyrics').
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

/*
 function encode(file) {
     var fs = require('fs');
     // read binary data
     var binary_blob = fs.readFileSync(file);
     // convert binary data to base64 encoded string
     return new Buffer(binary_blob).toString('base64');
 }*/

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
                        changePassword(name, old_password, new_password);
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
                            deleteAccount(name, password);
                        }

                    }
                }
            }
        });

    }
});

app.controller('myController3', function ($scope, $http, $q) {
    //Trae la biblioteca del Cloud y la reconstruye
    $scope.localSync = function () {
        $http({
            url: localStorage.server + 'api/v1/users/' + localStorage.username + '/libraries/1/?type=all',
            method: 'GET',
            dataType: "json",
            headers: {
                'Content-Type': 'application/json'
            }
        }).
        success(function (data) {
            $scope.responses = [];
            $scope.doneLoading = false;
            var urls = data;

            var promise = $q.all(null);
            angular.forEach(urls, function (url) {

                console.log(url);

                promise = promise.then(function () {
                    return $http({
                        method: url.method,
                        url: url.url
                    }).then(function (res) {
                        console.log("Solicitud lista!");
                        var fs = require('fs');

                        //Procesamiento de la cancion
                        var song_path = 'storage/' + localStorage.username + '/1/' + res.data.title + '.mp3';
                        var contents = fs.writeFileSync(song_path, new Buffer(res.data.blob, 'base64'));

                        var songJson = {
                            "title": res.data.title,
                            "artist": res.data.artist,
                            "album": res.data.album,
                            "year": res.data.year,
                            "genre": res.data.genre,
                            "lyrics": res.data.lyrics,
                            "id": res.data.id,
                            "lib": "1",
                            "path": String(song_path)
                        }

                        insert_song_withID(JSON.stringify(songJson));

                        var width = $('#loadingBar').width();
                        var parentWidth = $('#loadingBar').offsetParent().width();
                        var percent = 100 * width / parentWidth;

                        var cant = 100 / urls.length;
                        $('#loadingBar').css("width", (percent + cant) + '%');

                        $scope.responses.push(res.data);
                    });
                });
            });

            promise.then(function () {
                //This is run after all of your HTTP requests are done
                console.log("done");
                $('#loadingBar').css("width", '0%');
                $('#loading').removeClass('open');
                $scope.doneLoading = true;
                localStorage["localSync"] = true;
            })


        });
    }
    if (localStorage.localSync == "false") {
        console.log("Starting Sync");
        $scope.localSync();

    }
});


app.controller('UserMenuCtrl2', function ($http, $scope, $q) {

    //Sube las canciones locales al servidor de odyssey
    $scope.cloudSync = function () {
        re_songs("1", function (resultCamino) {

            // retorna un Json array con todas las canciones de la biblioteca lib (result contiene el valor del return) 
            $http({
                url: localStorage.server + 'api/v1/users/' + localStorage.username + '/libraries/1',
                method: 'PUT',
                data: resultCamino,
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).
            success(function (data) {

                //  re_songs_withBlob("1", function (result) {
                $scope.responses = [];
                $scope.doneLoading = false;

                var urls = data;
                var i = 0;
                var promise = $q.all(null);

                console.log("------------------------------------------------");
                console.log(resultCamino);
                console.log("------------------------------------------------");
                console.log(urls);

                angular.forEach(urls, function (url) {

                    if (url.method != "NONE") {
                        //No lleva el blob
                        if (url.method == "PUT") {
                            console.log("PUT");
                            console.log(resultCamino[i].title);
                            console.log(resultCamino[i].id);

                            //  re_songs("1", function (result1) {

                            promise = promise.then(function () {
                                return $http({
                                    method: url.method,
                                    url: url.url,
                                    data: JSON.stringify(resultCamino[i])
                                }).then(function (res) {
                                    console.log("Solicitud lista!");
                                    $scope.responses.push(res.data);
                                    i++;
                                });
                            });

                            // });

                        }

                        //Si lleva el blob
                        else if (url.method == "POST") {

                            promise = promise.then(function () {

                                re_songs_withBlob("1", function (result) {
                                    console.log("POST");
                                    console.log(result[i].title);
                                    console.log(result[i].id);
                                    return $http({
                                        method: url.method,
                                        url: url.url,
                                        data: JSON.stringify(result[i])
                                    }).then(function (res) {
                                        console.log("Solicitud lista!");
                                        $scope.responses.push(res.data);
                                        i++;
                                    });
                                });

                            });
                        }

                        //Si se debe borrar la cancion
                        else if (url.method == "DELETE") {
                            promise = promise.then(function () {
                                return $http({
                                    method: url.method,
                                    url: url.url,
                                }).then(function (res) {
                                    console.log("Solicitud lista!");
                                    $scope.responses.push(res.data);
                                    i++;
                                });
                            });
                        }

                    } else {
                        i++;
                    }


                });
                promise.then(function () {
                    //This is run after all of your HTTP requests are done
                    console.log("done");
                });
                //   });


            });



        });



    }


});



/*
function casa($scope, $http, $q) {

    $scope.responses = [];
    $scope.doneLoading = false;
    var urls = [
    'http://192.168.1.135:9080/OdysseyCloud/api/v1/users/1/libraries/1/songs/1?data=all',
    'http://192.168.1.135:9080/OdysseyCloud/api/v1/users/1/libraries/1/songs/3?data=all'
  ];

    var promise = $q.all(null);
    angular.forEach(urls, function (url) {
        promise = promise.then(function () {
            return $http({
                method: 'GET',
                url: url
            }).then(function (res) {
                console.log("Solicitud lista!");

                var width = $('#loadingBar').width();
                var parentWidth = $('#loadingBar').offsetParent().width();
                var percent = 100 * width / parentWidth;

                var cant = 100 / 9;
                console.log((percent + cant) + '%');
                $('#loadingBar').css("width", (percent + cant) + '%');
                $scope.responses.push(res.data);
            });
        });
    });

    promise.then(function () {
        //This is run after all of your HTTP requests are done
        console.log("done");
        $('#loadingBar').css("width", '0%');
        $('#loading').removeClass('open');
        $scope.doneLoading = true;
    })

}*/