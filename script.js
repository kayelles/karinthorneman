$(document).ready(function() {

    $.ajax({
        "type" : "get",
        "success" : function(data) {
            if ($(window).height() > 1000) {
                $("#container").css("height", $(window).height());
            }
            else {
                $("#container").css("height", 1000);
            }
        },
        "error" : function(data) {
            alert("Error: Content could not be loaded");
        }
    });

    $("img").click(function() {
        slideout();
    });
});

function slideout() {
    $("img").addClass('animated fadeOut');
    $("img").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        window.location = "hem/index.html";
    });




}






