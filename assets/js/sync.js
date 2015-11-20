$(document).ready(function () {

    $('#publish-btn').click(function () {
        console.log("publishing m8");
        /*var request = require('request');
        request.get({
            url: 'http://localhost:9080/OdysseyCloud/api/v1/users/1/libraries/1/'
                // formData: formData
        }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            console.log('Upload successful!  Server responded with:', body);
        });*/

        var audio = document.getElementById('music-player');
        audio.pause();
        audio.setAttribute('src', localStorage.server + 'api/v1/users/1/libraries/1/songs/1');
        audio.play(); //call this to play the song right away

    });

});

//Update items
function updateLocal(data){
    updateItems(data);
}


function asynchFuncUpdate(n, fn) {
    //console.log(n);
    update_song(JSON.stringify(n));
    
    setTimeout(fn, n);
}


function updateItems(items) {
    var i = 0,
        length = items.length,
        fn = function () {
            if (i < length) {
                asynchFuncUpdate(items[i], fn);

                i++;
            }
        };
    fn();
}



//Commit items
function commitLocal(data) {
    //var parsed = JSON.parse(data);
    processItems(data);
}

function asynchFunc(n, fn) {
    //console.log(n);
    insert_song(JSON.stringify(n));
    setTimeout(fn, n);
}


function processItems(items) {
    var i = 0,
        length = items.length,
        fn = function () {
            if (i < length) {
                asynchFunc(items[i], fn);

                i++;
            }
        };
    fn();
}