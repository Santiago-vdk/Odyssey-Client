$(document).ready(function () {
    $('#jstree').jstree({
        "core": {},
       /* "types": {
            "#": {
                "max_children": 1,
                "max_depth": 4,
                "valid_children": ["root"]
            },
            "root": {
                "id":0,
                
                "valid_children": ["default"]
            },
            "default": {
                "valid_children": ["default", "file"]
            },
            "file": {
                "icon": "",
                "valid_children": []
            }
        },*/
        "plugins": [
                "contextmenu", "dnd", "search",
                "state", "types", "wholerow"
            ]
    });

  /*  $('#jstree')
        .on("changed.jstree", function (e, data) {
            if (data.selected.length) {
                // alert('The selected node is: ' + data.instance.get_node(data.selected[0]).text);
            }
        })
        .jstree({
            'core': {
                'multiple': false,
                'data': [{
                    "text": "Root node",
                    "children": [{
                        "text": "Child node 1",
                        "id": 1
                        }, {
                        "text": "Child node 2"
                        }]
                    }]
            }
        });*/
    $('#evts_button').on("click", function () {
        console.log("clicked");

        var nodeID = $('#jstree').jstree(true).create_node($("#root")[0], "test");
        $('#jstree').jstree(true).set_id(nodeID, "test" + "_node");
    });
});

function addSong(song) {




}