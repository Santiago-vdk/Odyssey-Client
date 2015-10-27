$(document).ready(function () {


    $("#drop-zone").hover(function () {
        // $(this).effect("highlight", {}, 3000);
        $("#drag-drop-text").addClass('animated shake').one('webkitAnimationEnd',
            function () {
                $("#drag-drop-text").removeClass('animated shake')
            });

        $(this).addClass('animated pulse').one('webkitAnimationEnd',
            function () {
                $(this).removeClass('animated pulse')
            });
    });
});