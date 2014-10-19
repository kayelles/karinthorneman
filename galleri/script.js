
/* Script for the image gallery page */

/*========================================================================== *
*	TODO list  														         * 
*                                                                            *
*	[ ] Fix the front page 													 * 
*	[ ] Fix the bug with remove 											 * 
*	[x] make images able to pop out 										 * 
*	[ ] cache images into memory when page is loaded                         *
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
var exhibition = "2014";
var screenheight = 0;
var imageList = [];

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
				handleclick($(this), e)
			});
            $(document).on("keydown", function(e) { handleKeyPress(e) });



        },
        "error" : function() { alert("Error: Content could not be loaded"); }
    });
});


/*
    Appends images to the webpage
*/

function getImagedata() {
    imageCount  = 0;
    for (i = 0; i < imageData["paths"].length; i++) {
        if (imageData["exhibitions"][i] == exhibition) {
			var imagetag = '<img data-lightbox="image1" src="' + 
							imageData["paths"][i] + '" />';
			var imageLink = '<a href="' + imageData["paths"][i] + 
							'" data-lightbox="image1">' + imagetag + '</a>';
            imageCount++;
            imageList.push(imageLink);
        }
    }
}

/* Displays an image with index index  */

function addImages() {
	for (i = 0; i < imageList.length; i++) {
		$("#crossfade").append(imageList[i]);
	}
	$("#crossfade a:first-child").addClass("opaque");
}

function showImage() {
	$("#crossfade a").removeClass("opaque");
	$("#crossfade a").css('z-index', 0);
	var newImage = $("#crossfade a:nth-child(" + (index + 1) + ")");
	newImage.css('z-index', 1);
	newImage.addClass("opaque");
	updateSidebar();
	//TODO
	$("#container").css("height", imageData["heights"][index] + 600);
}


function render() {
    getImagedata();
	addImages();
	showImage();
    updateSidebar();
    screenheight = screen.height;
	$("#exh2014").addClass("focused");
}

/* Renders the container next to the image and its contents */

function updateSidebar() {
	var imagewidth = imageData["widths"][index];
	var scaleRatio = 500 / imagewidth;
	var scaledHeight = imageData["heights"][index] * scaleRatio;
    $("#control").css("height", scaledHeight);
    $("#contentHolder").css("height", scaledHeight + 100);
    $("#description").css("top", scaledHeight - 100);
    $("#description").empty();
    $("#description").append(imageData["descs"][index]);
    $("#whichimage").empty();
    $("#whichimage").append((index + 1) + "/" + imageCount);
}

/*
    Handles the event when an element is clicked 
*/

function handleclick(caller, e) {
	if (caller.hasClass('octicon-chevron-left')) {
		index--;
		if (index < 0) {
			index = imageCount - 1;
		}
		showImage();
	}
	else if (caller.hasClass('octicon-chevron-right')) {
		index++;
		if (index == imageCount) {
			index = 0;
		}
		showImage();
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
	else if (caller.is($("#crossfade a"))) {
		//something else 
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
        showImage();
    }
    else if (e.which == 39) {
        index++;
        if (index == imageCount) {
            index = 0;
        }
        showImage();
    }
}

