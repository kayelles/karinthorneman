/* For image displaying */

var images = [];
var index = 0;

images.push("../images/1.jpg");
images.push("../images/2.jpg");
images.push("../images/3.jpg");
images.push("../images/4.jpg");
images.push("../images/5.jpg");


function displayImage(index) {
    var img     = new Image();
    var imgSrc  = images[index];
    img.src     = imgSrc;
    img.onload  = function() {
        var width = this.width;
        var height = this.height;
        if ($(".image").children().length > 0) {
            $(".image").empty();
        }
        $(".image").prepend('<img id="image" src="' + imgSrc + '" />');

        /*$(".part").css("background-image", "url(" + imgSrc + ")");
        $('.part').css("height", height);
        $('.part').css("width", width / 2);
        $(".part.right").css("background-position", -(width / 2));
        $('.part.right').css("margin-left", width / 2);*/

        $('.mega-octicon').css("font-size", 48);
        $('.octicon-chevron-right').css("margin-left", width - 44);

    }
}

function nextImage() {
    if (index <= 3) {
        index++;
        displayImage(index);
    }
}

function previousImage() {
    if (index >= 1) {
        index--;
        displayImage(index); 
    }
}

$('.left').click(function() {
    previousImage();
});
$('.right').click(function() {
    nextImage();
});

var fadeDelay = 10000;

var timeout = null;

$(document).on("keydown", (function(e) {
    if (e.which == 37) {
        previousImage();
        showFaded();
        $(".fadeOut").stop();
        clearTimeout(timeout)
        fadeOut(fadeDelay);
    }
    else if (e.which == 39) {
        nextImage();
        showFaded();
        $(".fadeOut").stop();
        clearTimeout(timeout)
        fadeOut(fadeDelay);
    }
}));

$("#menu").addClass("fadeOut");
$(".footer").addClass("fadeOut");

function fadeOut(delay) {
    $(".fadeOut").delay(delay).animate({"opacity" : 0.1}, 1500);
}

function showFaded() {
    $(".fadeOut").css("opacity", 1);
}

$(document).on('mousemove', function() {
    if (timeout !== null) {
        clearTimeout(timeout)
        showFaded();
        $(".fadeOut").stop();
    }
    timeout = setTimeout(function() {
        timeout = null;
        fadeOut(0);
    }, fadeDelay);
});

displayImage(0);
fadeOut(fadeDelay);

