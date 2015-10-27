try {
    //get node webkit GUI
    var gui = require('nw.gui');
        // get the window object
    var win = gui.Window.get();

    win.on('loaded', function () {
        // the native onload event has just occurred
        var document = win.window.document;
        var dropTarget = document.querySelector("#drop-zone");

        //DRAG & DROP CANCIONES
        require("drag-and-drop-files")(dropTarget, function (files) {
            console.log("Got some files:", files)
            try {
                for (var i = 0; i < files.length; i++) {
                    //Here are all the dragged songs
                }
            } catch (err) {
                console.log("Hubo un error: " + err);
            }
        })
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



    function send(cont) {
        request({
            method: 'POST',
            url: 'http://localhost:9080/OdysseyCloud/api/v1/users/1/libraries/1/songs',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: "Prueba",
                blob: cont
            })

        }, callback);

    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info);
        }

    }



} catch (err) {
    console.log("Probably not running on NWJS, NP m8.");
    console.log("No Require() will work in this mode.");
}




/*
    var fs = require('fs');
    var mm = require('musicmetadata');
    var request = require('request')
    
              // create a new parser from a node ReadStream 
                    var parser = mm(fs.createReadStream(files[i].path), function (err, metadata) {
                        if (err) throw err;
                        console.log(metadata);
                    });

                    var content;

                    fs.readFile(files[i].path, 'ascii', 'rb', function (err, data) {
                        if (err) throw err;

                        console.log(data);

                        request({
                            method: 'POST',
                            url: 'http://localhost:9080/OdysseyCloud/api/v1/users/1/libraries/1/songs',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: "Prueba",
                                blob: data
                            })

                        }, callback);



                    });



                    //Insertar cancion en SQLite
                    //insertSong(files[i]);

                    //Agregar cancion al arbol
                    //addSong(files[i]);

*/