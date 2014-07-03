/* Probably alot of dead code in this script needs a cleanng*/

/* Script for the image gallery page */
    
// Arrays to be loaded with all data that can be displayed

var imagelist = []
var descriptions = [];
var widths = [];
var heights = [];

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
        "url" : "../data/imagedata.json",
        "success" : function(data) {
            for (var i = 0; i < data.length; i++) {
                imagelist.push(data[i].src);
                descriptions.push(data[i].desc);
                widths.push(data[i].width);
                heights.push(data[i].height);
            }
            addImages();
            showImage(index)
            renderSidebar(index);
            
            $('#togglefade').on({
                mouseenter : function() { fadeout(); },
                mouseleave : function() {
                    $(".fadeout").stop();
                    showFaded();
                }
            });
            $('.clickable').on('click', function(e) { handleClick($(this), e) });
            $(document).on("keydown", function(e) { handleKeyPress(e) });

            $("#images").hover(function() {
                $(this).on("mousemove", function(e) { handleImageHover($(this), e)});
            });
        },
        "error" : function() { alert("Error: Content could not be loaded"); }
    });
});

/*
    Handles the cursor if hovering over an image
*/

function handleImageHover(caller, e) {
    if (index == 0 || index == imagelist.length - 1) {
        var mx = e.pageX;
        var my = e.pageY;
        var osx = caller.offset().left;
        var relx = mx - osx;
        if (index == 0) {
            if (relx > imageWidth / 2) {
                caller.css("cursor" , "pointer");
            }
            else {
                caller.css("cursor" , "auto");
            }
        }
        else {
            if (relx < imageWidth / 2) {
                caller.css("cursor" , "pointer");
            }
            else {
                caller.css("cursor" , "auto");
            }
        }
    }
    else {
        caller.css("cursor" , "pointer");
    }
}

/*
    Handles the event when an element is clicked 
*/

function handleClick(caller, e) {
        if (caller.is('#images')) {
            var mx = e.pageX;
            var my = e.pageY;
            var osx = caller.offset().left;
            var relx = mx - osx;
            if (relx < imageWidth / 2) {
                previousImage();
            }
            else {
                nextImage();
            }
        }
        else if (caller.hasClass('octicon-chevron-left')) {
            previousImage();
        }
        else {
            nextImage();
        }
}

/*
    Handles the event when a key is pressed
*/

function handleKeyPress(e) {
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

function addImages() {
    var images = $("#images");
    for (i = 0; i < imagelist.length; i++) {
        images.append('<img class="hidden" src="' + imagelist[i] + '" />')
    }
    var firstImage = images.children().first();
    images.children().css({
        "position" : "absolute",
        "top" : 0,
        "left" : 250,
        "opacity" : 0
    });
    firstImage.css({
    });
}

function hideImage(index) {
    var image = $("#images").find(":nth-child(" + (index + 1) + ")");
    image.animate({"opacity" : 0}, 500);
}

function showImage(index) {
    var image = $("#images").find(":nth-child(" + (index + 1) + ")");
    image.animate({"opacity" : 1}, 500);
    imageWidth = widths[index];
    imageHeight = heights[index];
}

function renderSidebar() {
    $("#control").css("height", imageHeight);
    var desc = $("#description");

    desc.empty();

    desc.append(descriptions[index]);
    
    var whichimage = $("#whichimage");
    whichimage.empty();
    whichimage.append((index + 1) + "/" + imagelist.length);
}


function render(index) {
    
    


    /* ensure the contentholder is big enough for the content */

/*
    $(document).ready(function() {
        var min_width = img.width() + desc.width() + 300;
        $("body").css("min-width", min_width);
    });

    renderArrows(index, imageWidth);

    */
}

/*
    Creates and positions the navigation arrows
*/

function renderArrows(index, width) {
    var arrows      = $('.mega-octicon');
    var leftArrow   = $('.octicon-chevron-left');
    var rightArrow  = $('.octicon-chevron-right');

    if (index == imagelist.length - 1) {
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
    hideImage(index);
    index < imagelist.length - 1 ? index++ : index = 0;
    showImage(index);
    renderSidebar(index);
}

/*
    Request the previous image
*/

function previousImage() {
    hideImage(index);
    index > 0 ? index-- : index = imagelist.length - 1;
    showImage(index);
    renderSidebar(index);
}

/*
    Attempts to fade out some elements
*/

function fadeout() {
    $(".fadeout").animate({"opacity" : 0}, 1500);
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
}

