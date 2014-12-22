
/* Script for the image gallery page */

/*========================================================================== *
*	TODO list  														         * 
*                                                                            *
*	[ ] Fix the front page 													 * 
*	[ ] Fix remove 											 * 
*	[x] make images able to pop out 										 * 
*	[x] cache images into memory when page is loaded                         *
*	[ ] Add error checking for file and user input							 * 
*	[ ] Add functionality for updating description and text fields  		 * 
*	[x] Fix bug with description not corresponding to correct image 		 * 
*                                                                            *
/*===========================================================================*/ 


// global variables

/*  Idea, add an active class to clickable elements and remove / add it before after
 *  finishing animating. Check for it before starting animation */ 

var index = 0;
var imageCount = 0;
var exhibition = "2014";
var json_data;
var screenheight = 0;
var descList = [];
var imageData = {
	"exhibitions"   : [],
	"paths"         : [],
	"descs"         : [],
	"widths"        : [],
	"heights"       : []
};

/*	The object that is to be loaded with server data*/


/*	Main script
 *
 *	Loads data from server and handles user interaction */ 

$(document).ready(function() {
    $.ajax({
        "type" : "post",
        "url" : "../data/imagedata.json",
        "success" : function(data) {

			json_data = data;

            // Initialize rendering

			$("#exh2014").addClass("focused");
			$("#exh2010").removeClass("focused");
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
 *	Read the Json data 
 */

function loadImageData() {
	imageData = {
		"exhibitions"   : [],
		"paths"         : [],
		"descs"         : [],
		"widths"        : [],
		"heights"       : []
	};
	for (var i = 0; i < json_data.length; i++) {
		if (json_data[i].exh == exhibition) {
			imageData["exhibitions"].push(json_data[i].exh);
			imageData["paths"].push(json_data[i].src);
			imageData["descs"].push(json_data[i].desc);
			imageData["widths"].push(json_data[i].width);
			imageData["heights"].push(json_data[i].height);
		}
	}
}

/*
 *	Appends images
 */

function addImages() {
    imageCount  = 0;
    for (i = 0; i < imageData["paths"].length; i++) {
		var imagetag = '<img data-lightbox="image1" src="' + 
						imageData["paths"][i] + '" />';
		var imageLink = '<a href="' + imageData["paths"][i] + 
						'" data-lightbox="image1">' + imagetag + '</a>';
		imageCount++;
		//imageList.push(imageLink);
		$("#crossfade").append(imageLink);
		descList.push(imageData["descs"][i]);
    }
	$("#crossfade a:first-child").addClass("opaque");
}

/*
 *	Display an image
 */

function showImage() {
	$("#crossfade a").removeClass("opaque");
	$("#crossfade a").css('z-index', 0);
	var newImage = $("#crossfade a:nth-child(" + (index + 1) + ")");
	newImage.css('z-index', 1);
	newImage.addClass("opaque");
	updateImageInfo();
}

/* 
 * 	Update content to match the current image
 */

function updateImageInfo() {
	var imagewidth = imageData["widths"][index];
	var scaleRatio = 600 / imagewidth;
	var scaledHeight = imageData["heights"][index] * scaleRatio;

    $("#description").empty();
    $("#description").append(descList[index]);

	$("#container").css("height", scaledHeight + 700);
    $("#contentHolder").css("height", scaledHeight + 200);
    $("#description").css("top", scaledHeight + 100);
    $("#whichimage").empty();
	if (imageCount > 0) {
		$("#whichimage").append((index + 1) + "/" + imageCount);
	} 
	else {
		$("#whichimage").append("No images");
	}
}

/*
 *	Render the content
 */

function render() {
	descList = [];
	$("#crossfade").empty();
	loadImageData();
    addImages();
	showImage();
    screenheight = screen.height;
}

/*
 *    Handles the event when an element is clicked 
 */

function handleclick(caller, e) {
	if (imageCount > 0) {
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
	}
	if (e.target.id == "exh2014") {
		exhibition = "2014";
		$("#exh2014").addClass("focused");
		$("#exh2010").removeClass("focused");
		index = 0;
		render();
	}
	else if (e.target.id == "exh2010") {
		exhibition = "2010";
		$("#exh2010").addClass("focused");
		$("#exh2014").removeClass("focused");
		index = 0;
		render();
	}
	else if (caller.is($("#crossfade a"))) {
		//something else 
	}
}

/*
 *    Handles the event when a key is pressed
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

