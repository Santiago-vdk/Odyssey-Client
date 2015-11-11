var data = [
    {
        'text': 'Root node 2',
        'icon': "fa fa-book fa-lg",
        'state': {
            'opened': true,
            'selected': true
        },
        'children': [
            {
                'text': 'Child 1',
                'icon': "fa fa-music fa-lg"
                        },
            {
                'text': 'Child 2',
                'icon': "fa fa-music fa-lg"
                        },
        ]
      }
    ]

$(function () {
    $('#jstree').jstree({
        'core': {
            'data': {
                "url": localStorage.server + 'api/v1/users/1/libraries/1?type=tree',
                "type": 'GET',
                'dataType': 'JSON',
                "data": function (n) {
                    // get parent / grandparent node
                    var lists = $(n).parents('ul');
                    var p = $(lists[0]).prev('a');
                    var gp = $(lists[1]).prev('a');
                    // the result is fed to the AJAX request 'data' option
                    return {
                        "parent": $.trim(p.text()),
                        "grandparent": $.trim(gp.text()),
                        "id": n.attr ? n.attr("id").replace("node-", "") : 1,
                    };
                }
            }
        }
    });
});

$(document).ready(function () {
    $('#jstree').on("changed.jstree", function (e, data) {
        if (data.selected == "root") {
            //localStorage["viewinglibrary"] = data.selected; //Aqui identificador de la biblioteca, el due;o siempre es el username
            //window.location.href = "#/library/" + localStorage.username + "/" + String(data.selected);
            window.location.href = "#/editor"
        } else {
          /*  localStorage["viewingsong"] = data.selected; //Aqui identificador de la cancion, el due;o siempre es el username
            console.log(data.selected);
            window.location.href = "#/song_info/" + localStorage.username + "/1/" + String(data.selected);*/
        }
    });


    $('#jstree').bind("dblclick.jstree", function (event) {
        var node = $(event.target).closest("li");
        var data = node.data("jstree");
        console.log("Doble click " + data);
    });
});