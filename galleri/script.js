
/* Script for the image gallery page */

/*========================================================================== *
*	TODO list                                                                * 
*                                                                            *
*   [x] add functionality for adding more categories                         *
*	[x] Fix the front page (remove it                                        *
*	[x] Put category under image in remove page                              *
*	[x] Fix 'safe' password                                                  * 
*   [ ] Fix screenheight                                                     *	
*   [ ] test add and remove for different types of images                    *
*	[x] Fix remove                                                           * 
*	[x] make images able to pop out                                          * 
*	[x] cache images into memory when page is loaded                         *
*	[ ] Add error checking for file and user input                           * 
*	[x] Add functionality for updating text fields                           * 
*	[x] Fix bug with description not corresponding to correct image          * 
* 	[ ] check for all browsers                                               * 
*          [ ] Internet Explorer                                             *
*          [ ] Google chrome                                                 *
*          [ ] Safari                                                        *
*   [ ] Check on different monitors                                          *
*   [ ] check on ipad, iphone                                                *
*   [ ] meta keyword tags                                                    *
*   [x] fix so it's possible to upload to right category                     *
*   [x] make the categories always sorted under remove picture               *
/*===========================================================================*/ 

// global variables
var index = 0;
var imageCount = 0;
var exhibition;

var image_json, category_json;

var nameIDs = {};

/*	Dynamic array holding the image captions */
var descList = [];

/*	The object that is to be loaded with server data*/
var imageData = {
	"exhibitions"   : [],
	"paths"         : [],
	"descs"         : [],
	"widths"        : [],
	"heights"       : []
};

var categoryData = {
		"names" : []
};
	
/*	Main script
 *
 *	Loads data from server and handles user interaction */ 

$(document).ready(function() {
            
	$.ajax({
		"type" : "post",
		"url" : "../data/imagedata.json",
		"dataType": "json",
		"success" : function(data) {
			image_json = data;

			$.ajax({
				"type" : "post",
				"url" : "../data/categories.json",
				"dataType": "json",
				"success" : function(data) {
					category_json = data;
					render();
					// Handle IO events
					$('.clickable').on('click', function(e) { 
						handleclick($(this), e)
					});
					$(document).on("keydown", function(e) { handleKeyPress(e) });
				},
				"error" : function() { alert("Error: Content could not be loaded"); }
			});

		},
		"error" : function() { alert("Error: Content could not be loaded"); }
	});

	
});

/*
 *	Render the content
 */

function render() {
	$("#exhlist").empty();
	loadCategoryData();
	addCategories();
	renderImages();
}

function renderImages() {
	$("#crossfade").empty();
	descList = [];
	loadImageData();
	addImages();
	showImage();
}

/*	
 *	load the category Json data 
 */

function loadCategoryData() {
	categoryData = {
		"names" : []
	};
	for (var i = 0; i < category_json.length; i++) {
		categoryData["names"].push(category_json[i].name);
	}
}

function addCategories() {
	for (i = 0; i < categoryData["names"].length; i++) {
		var categoryTag = '<li id="exh' 
			+ i + '" class="clickable category">' 
			+ categoryData["names"][i] + '</li>';
		nameIDs["exh" + i] = categoryData["names"][i];
		$("#exhlist").append(categoryTag);
	}
	//default
	$("#exh0").addClass("focused");
	exhibition = nameIDs["exh0"];
}

/*	
 *	load the image Json data 
 */

function loadImageData() {

	imageData = {
		"exhibitions"   : [],
		"paths"         : [],
		"descs"         : [],
		"widths"        : [],
		"heights"       : []
	};
	for (var i = 0; i < image_json.length; i++) {
		if (image_json[i].exh == exhibition) {
			imageData["exhibitions"].push(image_json[i].exh);
			imageData["paths"].push(image_json[i].src);
			imageData["descs"].push(image_json[i].desc);
			imageData["widths"].push(image_json[i].width);
			imageData["heights"].push(image_json[i].height);
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
	$("#container").css("height", 1400);
	$("#contentHolder").css("height", scaledHeight + 200);
	$("#description").css("top", scaledHeight + 50);
	$("#whichimage").empty();
	if (imageCount > 0) {
		$("#whichimage").append((index + 1) + "/" + imageCount);
	} 
	else {
		$("#whichimage").append("No images");
	}
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
	if (caller.hasClass("category")) {
		$("#exhlist li").each(function() {
			$(this).removeClass("focused");
		});
		$("#" + caller.attr("id")).addClass("focused");
		exhibition = nameIDs[caller.attr("id")];
		renderImages();
	}
	else {
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

