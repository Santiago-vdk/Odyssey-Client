$(document).ready(function () {
    $('a[href="#search"]').on('click', function (event) {

        event.preventDefault();
        $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
    });

    $('#search, #search button.close').on('click keyup', function (event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });

    $('#omni-search').on('click', function (event) {
        if ($('#omni-text').val() === "") {
            $('#omni-text').attr("placeholder","D: Don't break it, we can't search for nothing...");
        } else {
            var searchValue = $('#omni-text').val();
            console.log("Omnisearch go! " + searchValue);
            
            var search = {
                "query":searchValue
            }
            localStorage["search"] = JSON.stringify(search);
            window.location.href = "#/search";
            $('#search, #search button.close').removeClass('open');
            
        }

    });
    
    
    
      $('a[href="#loading"]').on('click', function (event) {
          console.log("clicked");
        event.preventDefault();
        $('#loading').addClass('open');
      //  $('#loading > form > input[type="search"]').focus();
    });

 

});