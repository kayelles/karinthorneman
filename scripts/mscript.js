/* Script for the image gallery page */
    
// Arrays to be loaded with all data that can be displayed

var images = []
var descriptions = [];
var widths = [];

// variables

var index = 0;
var imageWidth, imageHeight;

/*
    Main script
    
    Uses ajax to load data from server
    Handles user interaction with the page
*/

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
            
            $('#togglefade').on({
                mouseenter : function() { fadeout(0); },
                mouseleave : function() {
                    $(".fadeout").stop();
                    showFaded();
                }
            });

            $('.clickable').on('click', function(e) { handleClick() });

            $(document).on("keydown", function(e) { handleKeyDown() });
        },
        "error" : function() { alert("Error: Content could not be loaded"); }
    });
});

/*
    Handles the event when an element is clicked 
*/

function handleClick() {
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
}

/*
    Handles the event when a key is pressed
*/

function handleKeyPress() {
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
}

/*
------------------------------------------------------
This commented out section supports automatic fade out
--------------------------------------------------------

var fadeDelay = 1000;
var timeout = null;
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


/*
    Renders the content that to be displayed
*/

function render(index) {
    var img = $(".image");
    var desc = $(".description");

    img.empty();
    desc.empty();

    img.append('<img src="' + images[index] + '" />')
    desc.append(descriptions[index]);

    imageWidth = widths[index];
    renderArrows(index, imageWidth);
}

/*
    Creates and positions the navigation arrows
*/

function renderArrows(index, width) {
    var arrows      = $('.mega-octicon');
    var leftArrow   = $('.octicon-chevron-left');
    var rightArrow  = $('.octicon-chevron-right');

    arrows.css("font-size", 48);
    rightArrow.css("left", width - 54);

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

/*
    Request the next image
*/

function nextImage() {
    if (index < images.length - 1) {
        index++;
        render(index);
    }
}

/*
    Request the previous image
*/

function previousImage() {
    if (index > 0) {
        index--;
        render(index); 
    }
}

/*
    Attempts to fade out some elements
*/

function fadeout(delay) {
    $(".fadeout").delay(delay).animate({"opacity" : 0}, 1500);
    $(".contentHolder").css({
        "border-color"  : "#f2f2f2",
    });
}

/*
    Shows any faded out elements
*/

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

