
/* Script for the image gallery page */

/*========================================================================== *
*	TODO list  														         * 
*                                                                            *
*	[ ] Fix the front page 													 * 
*	[ ] Fix the bug with remove 											 * 
*	[x] make images able to pop out 										 * 
*	[ ] fix gallery page (limit clicks, make pop out image bigger)           *
*	[ ] Add error checking for file and user input							 * 
*	[ ] Add functionality for updating description and text fields  		 * 
*	[ ] Fix bug with description not corresponding to correct image 		 * 
*                                                                            *
/*===========================================================================*/ 


// global variables

/*  Idea, add an active class to clickable elements and remove / add it before after
 *  finishing animating. Check for it before starting animation */ 

var index = 0;
var imageCount = 0;
var imageList = [];
var exhibition = "2014";
var screenheight = 0;

/*	The object that is to be loaded with server data*/

var imageData = {
    "exhibitions"   : [],
    "paths"         : [],
    "descs"         : [],
    "widths"        : [],
    "heights"       : []
};

/*	Main script
 *
 *	Loads data from server and handles user interaction */ 

$(document).ready(function() {
    $.ajax({
        "type" : "post",
        "url" : "../data/imagedata.json",
        "success" : function(data) {

            // Load data 

            for (var i = 0; i < data.length; i++) {
                imageData["exhibitions"].push(data[i].exh);
                imageData["paths"].push(data[i].src);
                imageData["descs"].push(data[i].desc);
                imageData["widths"].push(data[i].width);
                imageData["heights"].push(data[i].height);
            }

            // Initialize rendering

            render();
            
            // Handle events

            $('.clickable').on('click', function(e) { 
                handleClick($(this), e)
            });
            $(document).on("keydown", function(e) { handleKeyPress(e) });

        },
        "error" : function() { alert("Error: Content could not be loaded"); }
    });
});


function render() {
    getImagedata();
    showImage(index);
    renderSidebar(index);
    screenheight = screen.height;
    if ($(window).height() > 1000) {
        $("#container").css("height", $(window).height());
    }
    else {
        $("#container").css("height", 1000);
    }
}

/*
    Handles the event when an element is clicked 
*/

function handleClick(caller, e) {
    if (caller.hasClass('octicon-chevron-left')) {
        index--;
        if (index < 0) {
            index = imageCount - 1;
        }
        showImage(index);
    }
    else if (caller.hasClass('octicon-chevron-right')) {
        index++;
        if (index == imageCount) {
            index = 0;
        }
        showImage(index);
    }
    else if (e.target.id == 1) {
        exhibition = "2014";
        index = 0;
        render();
    }
    else if (e.target.id == 2) {
        exhibition = "2010";
        index = 0;
        render();
    }
}

/*
    Handles the event when a key is pressed
*/

function handleKeyPress(e) {
    if (e.which == 37) {
        index--;
        if (index < 0) {
            index = imageCount - 1;
        }
        showImage(index);
    }
    else if (e.which == 39) {
        index++;
        if (index == imageCount) {
            index = 0;
        }
        showImage(index);
    }
}


/*
    Appends images to the webpage
*/

function getImagedata() {
    imageCount  = 0;
    imageList   = [];

    for (i = 0; i < imageData["paths"].length; i++) {
        if (imageData["exhibitions"][i] == exhibition) {
            var imagetag = '<img src="' + imageData["paths"][i] + '" />';
            var anchor = '<a href="' + imageData["paths"][i] + '" data-lightbox="image-' + i
                +  '">' + imagetag + '</a>';
            imageCount++;
            imageList.push(anchor);
        }
    }
}
/* Displays an image with index index  */

function showImage(index) {
    var image = imageList[index];
    var imagetag = $("#image");
    var imagetag2 = $("#image2");
    var delay = 1000;
    imagetag2.css({opacity : 0});
    imagetag2.empty();
    imagetag2.append(image);
    imagetag2.animate({opacity : 1}, delay);
    imagetag.animate({opacity : 0}, delay, function() {
            imagetag.empty();
            imagetag.append(image)
        }).animate({opacity : 1}, delay);
    renderSidebar();
}


/* Hides an image with index index  */


/* Renders the container next to the image and its contents */

function renderSidebar() {
    $("#control").css("height", imageData["heights"][index]);
    var desc        = $("#description");
    var whichimage  = $("#whichimage");
    desc.empty();
    desc.append(imageData["descs"][index]);
    whichimage.empty();
    whichimage.append((index + 1) + "/" + imageCount);
}

/*
    Attempts to fade out elements that is a member of class "fadeout"
*/


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

