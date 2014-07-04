/* Script for the image gallery page */

// global variables

var index = 0;
var exh = "2014";

// The object that is to be loaded with server data

var imageData = {
    "paths"     : [],
    "descs"     : [],
    "widths"    : [],
    "heights"   : []
};

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

            // Load data 

            for (var i = 0; i < data.length; i++) {
                imageData["paths"].push(data[i].src)
                imageData["descs"].push(data[i].desc)
                imageData["widths"].push(data[i].width)
                imageData["heights"].push(data[i].height)
            }

            // Initialize rendering

            addImages("2014");
            showImage(index)
            renderSidebar(index);
            
            // Handle events

            /*
            $('#togglefade').on({
                click : function() { 
                    fadeout();
                },
                mouseleave : function() {
                    $(".fadeout").stop();
                    showFaded();
                }
            });
            */
            $('.clickable').on('click', function(e) { handleClick($(this), e) });
            $(document).on("keydown", function(e) { handleKeyPress(e) });

        },
        "error" : function() { alert("Error: Content could not be loaded"); }
    });
});

/*
    Handles the event when an element is clicked 
*/

function handleClick(caller, e) {
        if (caller.is('#images')) {
            var mx = e.pageX;
            var my = e.pageY;
            var osx = caller.offset().left;
            var relx = mx - osx;
            if (relx < imageData["widths"][index] / 2) {
                updateImage(false);
            }
            else {
                updateImage(true);
            }
        }
        else if (caller.hasClass('octicon-chevron-left')) {
            updateImage(false);
        }

        // working on this part
        else if (e.target.id == "1") {
            alert(e.target.id);
        }
        else if (caller.is("#2")) {
            alert(e.target.id);
        }
        else {
            updateImage(true);
        }
}

/*
    Handles the event when a key is pressed
*/

function handleKeyPress(e) {
    if (e.which == 37) {
        updateImage(false);
        showFaded();
        $(".fadeout").stop();
    }
    else if (e.which == 39) {
        updateImage(true);
        showFaded();
        $(".fadeout").stop();
    }
}


/*
    Appends images to the webpage
*/

function addImages(exhibition) {
    var images          = $("#images");
    var largestWidth    = 0 
    var largestHeight   = 0;

    if (exhibition == "2014") {

        for (i = 0; i < imageData["paths"].length; i++) {
            images.append('<img class="hidden" src="' 
                            + imageData["paths"][i] + '" />')
            if (imageData["widths"][i] > largestWidth) {
                largestWidth = imageData["widths"][i];
            }
            if (imageData["heights"][i] > largestHeight) {
                largestHeight = imageData["heights"][i];
            }
        }
        images.css({
            "width" : largestWidth,
            "height" : largestHeight
        });
        images.children().css({
            "position" : "absolute",
            "top" : 0,
            "left" : 0,
            "opacity" : 0
        });
    }
    else if (exhibition == "2010") {
        //foo...
    }
}

/* Displays an image with index index  */

function showImage(index) {
    var image = $("#images").find(":nth-child(" + (index + 1) + ")");
    image.animate({"opacity" : 1}, 500);
}

/* Hides an image with index index  */

function hideImage(index) {
    var image = $("#images").find(":nth-child(" + (index + 1) + ")");
    image.animate({"opacity" : 0}, 500);
}

/* Renders the container next to the image and its contents */

function renderSidebar() {
    $("#control").css("height", imageData["heights"][index]);
    var desc        = $("#description");
    var whichimage  = $("#whichimage");
    desc.empty();
    desc.append(imageData["descs"][index]);
    whichimage.empty();
    whichimage.append((index + 1) + "/" + imageData["paths"].length);
}

/*
    Display a new image. If the boolean flag next is true, display
    the next image. Else, display the previous image.
*/

function updateImage(next) {
    hideImage(index);
    if (next) {
        index < imageData["paths"].length - 1 ? index++ : index = 0;
    }
    else {
        index > 0 ? index-- : index = imageData["paths"].length - 1;
    }
    showImage(index);
    renderSidebar(index);
}

/*
    Attempts to fade out elements that is a member of class "fadeout"
*/

function fadeout() {
    $(".fadeout").animate({"opacity" : 0}, 1500);
}

/*
    Shows faded out elements
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

