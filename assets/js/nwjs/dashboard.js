 $(document).ready(function () {
     $('.fixed-div').click(function (event) { // where href are blank
         event.preventDefault();
     });
 });

 try {
     //get node webkit GUI
     var gui = require('nw.gui');
     var mm = require('musicmetadata');
     var fs = require('fs');
     var request = require('request')
         // get the window object
     var win = gui.Window.get();

     win.on('loaded', function () {
         // the native onload event has just occurred
         var document = win.window.document;
         var dropTarget = document.querySelector("#drop-zone");

         //DRAG & DROP CANCIONES
         require("drag-and-drop-files")(dropTarget, function (files) {
             // console.log("Got some files:", files)
             try {
                 localStorage.data = "[]";
                 handleTracks(files);
             } catch (err) {
                 console.log("Hubo un error: " + err);
             }
         })
     });

     win.on('close', function () {

         $.getScript("assets/js/authentication/auth.js", function () {
             logout(this);
             this.hide();

             // If the new window is still open then close it.
             if (win != null)
                 win.close(true);

             // After closing the new window, close the main window.
             this.close(true);
         });


     });

     win.setMinimumSize(720, 405);
     win.setMaximumSize(3000, 1688);
     win.width = 1280;
     win.height = 720;
     win.setPosition("center");
     //win.Maximize();

     var menubar = new gui.Menu({
         type: 'menubar'
     });
     var file = new gui.Menu();
     var subMenu = new gui.Menu();
     file.append(new gui.MenuItem({
         label: 'Action 1',
         click: function () {
             alert('Action 1 Clicked');
         }
     }));
     file.append(new gui.MenuItem({
         label: 'Action 2',
         click: function () {
             alert('Action 2 Clicked');
         }
     }));
     subMenu.append(new gui.MenuItem({
         label: 'SubMenu Action 1',
         click: function () {
             alert('SubMenu Action 1 Clicked');
         }
     }));
     subMenu.append(new gui.MenuItem({
         label: 'SubMenu Action 2',
         click: function () {
             alert('SubMenu Action 2 Clicked');
         }
     }));
     menubar.append(new gui.MenuItem({
         label: 'File',
         submenu: file
     }));
     file.append(new gui.MenuItem({
         label: 'Sub Action Menu',
         submenu: subMenu
     }));
     win.menu = menubar;
 } catch (err) {
     console.log("Probably not running on NWJS, NP m8.");
     console.log("No Require() will work in this mode.");
 }

 function Song(title, artist, album, year, genre, lyrics, path, library) {
     this.title = title;
     this.artist = artist;
     this.album = album;
     this.year = year;
     this.genre = genre;
     this.lyrics = lyrics;
     this.path = path;
     this.lib = library;
 }

 function handleTracks(trackArray) {
     var subarray = [];

     trackArray.forEach(function (eachDick, index) {
         parseFile(eachDick, function (result) {
             subarray.push(result);

             if ((trackArray.length - 1) === index) {
                 registerInfo(subarray);
             }
         });

     });
 }

 function parseFile(eachDick, fn) {

     var parser = mm(fs.createReadStream(eachDick.path), function (err, metadata) {
       //  var genre = metadata.genre[0];

         var genre = "undefined";
         var songObject = new Song(metadata.title, metadata.artist[0], metadata.album, metadata.year, genre, "", eachDick.path, "1");


         fn(songObject);
     });

 }

 function registerInfo(data) {
     localStorage["data"] = JSON.stringify(data);
     /*
          var scope = angular.element(document.getElementById('wrapper')).scope();
          scope.$apply(function () {
              scope.fillTable(data);
          });*/


     window.location.href = "#/dragged_songs";
 }

 function base64_encode(file) {
     // read binary data
     var binary_blob = fs.readFileSync(file);
     // convert binary data to base64 encoded string
     return new Buffer(binary_blob).toString('base64');
 }

 function post_song(data) {
     request({
         method: 'POST',
         url: localStorage.server + 'api/v1/users/1/libraries/1/songs',
         headers: {
             'content-type': 'application/json'
         },
         body: JSON.stringify({
             name: "Prueba",
             blob: data
         })
     }, callback);
 }

 function callback(error, response, body) {
     if (!error && response.statusCode == 200) {
         var info = JSON.parse(body);
         //console.log(info);
     }

 }