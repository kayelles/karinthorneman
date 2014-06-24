/* Script for the gallery page */

var images = []
var descriptions = [];
var widths = [];

var index = 0;
var fadeDelay = 10000;
var timeout = null;
var imageWidth, imageHeight;

$(document).ready(function() {
    $.ajax({
        "type" : "post",
        "url" : "../data/gimages.json",
        "success" : function(data) {
            for (var i = 0; i < data.imageData.length; i++) {
                images.push(data.imageData[i].src);
                descriptions.push(data.imageData[i].desc);
                widths.push(data.imageData[i].width);
            }
            render(0);
        },
        "error" : function() {
            alert("Error: Content could not be loaded");
        }
    });
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

function render(index) {
    var img = $(".image");
    var desc = $(".description");
    img.empty();
    desc.empty();
    img.prepend('<img src="' + images[index] + '" />')
    desc.append(descriptions[index]);
    imageWidth = widths[index];
    renderArrows(index, imageWidth);
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
        render(index);
    }
}

function previousImage() {
    if (index > 0) {
        index--;
        render(index); 
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
    $('.mega-octicon').mouseenter(function() {
        $(this).css('opacity', 1);
    });
    $('.mega-octicon').mouseleave(function() {
        $(this).css('opacity', 0.2);
    });
    $(".contentHolder").css({
        "border"  : "1px solid #bebebe",
    });
}

