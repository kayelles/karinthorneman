$(document).ready(function() {

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






