/* Script for the gallery page */

var images = [];
var index = 0;
var fadeDelay = 10000;
var timeout = null;
var imageWidth, imageHeight;


(function() {
    images.push("../images/1.jpg");
    images.push("../images/2.jpg");
    images.push("../images/3.jpg");
    images.push("../images/4.jpg");
    images.push("../images/5.jpg");
})();

$(document).ready(function() {
    renderImage(0);
});

$('#togglefade').mouseenter(function() {
    fadeout(0);
});
$('#togglefade').mouseleave(function() {
    $(".fadeout").stop();
    showFaded();
});

$('.clickable').on('click', function(e) {
    if ($(this).hasClass('image')) {
        var mx = e.pageX;
        var my = e.pageY;
        var osx = $(this).offset().left;
        var relx = mx - osx;
        if (relx < imageWidth / 2) {
            previousImage();
        }
        else {
            nextImage();
        }
    }
    else if ($(this).hasClass('octicon-chevron-left')) {
        previousImage();
    }
    else {
        nextImage();
    }
});

$(document).on("keydown", (function(e) {
    if (e.which == 37) {
        previousImage();
        showFaded();
        $(".fadeout").stop();
    }
    else if (e.which == 39) {
        nextImage();
        showFaded();
        $(".fadeout").stop();
    }
}));

/*
------------------------------------------------------
This commented out section supports automatic fade out
--------------------------------------------------------

fadeout(0);
$(document).on("keydown", (function(e) {
    if (e.which == 37) {
        previousImage();
        showFaded();
        $(".fadeout").stop();
        clearTimeout(timeout)
        fadeout(fadeDelay);
    }
    else if (e.which == 39) {
        nextImage();
        showFaded();
        $(".fadeout").stop();
        clearTimeout(timeout)
        fadeout(fadeDelay);
    }
}));

$(document).on('mousemove', function() {
    if (timeout !== null) {
        clearTimeout(timeout)
        showFaded();
        $(".fadeout").stop();
    }
    timeout = setTimeout(function() {
        timeout = null;
        fadeout(0);
    }, fadeDelay);
});
*/






function renderImage(index) {
    $(document).ready(function() {
        var img = $(".image");
        if (img.children().length > 0) {
            img.empty();
        }
        img.prepend('<img src="' + images[index] + '" />');
        imageWidth = img.width();
        renderArrows(index, img.width());
    });
}

function renderArrows(index, width) {
    var arrows      = $('.mega-octicon');
    var leftArrow   = $('.octicon-chevron-left');
    var rightArrow  = $('.octicon-chevron-right');
    arrows.css("font-size", 48);
    rightArrow.css("left", width - 44);
    if (index == images.length - 1) {
        rightArrow.css("display" , "none");
    }
    else if (index == 0) {
        leftArrow.css("display" , "none");
        rightArrow.css("left", width - 20);
    }
    else if (rightArrow.css("display") == "none") {
        rightArrow.css("display" , "inline");
    }
    else if (leftArrow.css("display") == "none") {
        leftArrow.css("display" , "inline");
    }
}

function nextImage() {
    if (index < images.length - 1) {
        index++;
        renderImage(index);
    }
}

function previousImage() {
    if (index > 0) {
        index--;
        renderImage(index); 
    }
}


function fadeout(delay) {
    $(".fadeout").delay(delay).animate({"opacity" : 0}, 1500);
    $(".contentHolder").css({
        "border-color"  : "#f2f2f2",
    });
}

function showFaded() {
    $('.fadeout').css('opacity' , 1); 
    $('.mega-octicon').css('opacity', 0.2);
    $(".contentHolder").css({
        "border"  : "1px solid #bebebe",
    });
}

