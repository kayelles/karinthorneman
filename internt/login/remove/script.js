
/* Script for the remove image page */

// global variables

var imageCount, categoryCount;
var screenheight = 0;
var imageList;

/*	The object that is to be loaded with server data*/

var imageData = {
	"ids"			: [],
	"exhibitions"	: [],
    "paths"         : []
};

/*	Main script
 *
 *	Loads data from server and handles user interaction */ 

$(document).ready(function() {
    $.ajax({
        "type" : "post",
        "url" : "../../../data/imagedata.json",
        "success" : function(data) {

            // Load data 

            for (var i = 0; i < data.length; i++) {
                imageData["ids"].push(data[i].id);
                imageData["paths"].push(data[i].src);
				imageData["exhibitions"].push(data[i].exh);
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


function render() {
	getImagedata();
	if (imageCount <= 0) { 
		$("#infoarea").append("<p>Inga bilder att visa</p>");
	} 
	else {
		addImages();
	}
}

/*
    Appends images to the webpage
*/

function getImagedata() {
	imageList = [];
    imageCount  = 0;
	categoryCount = 0;
	for (i = 0; i < imageData["paths"].length; i++) {
		if (!imageList.hasOwnProperty(imageData["exhibitions"][i])) {
			categoryCount++;
			imageList[imageData["exhibitions"][i]] = [];
		}
	}
    for (i = 0; i < imageData["paths"].length; i++) {
		var imagetag = '<img class="clickable" src="' + 
						"../../" + imageData["paths"][i] + '" />';
		imageCount++;
		imageList[imageData["exhibitions"][i]].push(imagetag);
    }
}

/* Displays an image with index index  */

function addImages() {
	for (var key in imageList) {
		$("#images").append("</br><h2>" + key + "</h2>");
		if (imageList.hasOwnProperty(key)) {
			$("#images").append(imageList[key]);
		}
		$("#images").append("</br></br></br><hr>");
	}
	updateScreenSize();
}

function updateScreenSize() {
	rows = Math.floor(imageCount / 4);
	if (rows >= 3) {
		$("#container").css("height", 1225 + ((rows - 3) * 300) + categoryCount * 200);
	}
}

function getIDFromPath(path) {
	for (i = 0; i < imageData["paths"].length; i++) {
		if ("../../" + imageData["paths"][i] == path) {
			return imageData["ids"][i];
		}
	}
}

function handleclick(caller, e) {
	if (window.confirm("är du säker?")) {
		image_path = caller.attr("src");
		image_id = getIDFromPath(image_path);
		$.post("remove.php", {path:image_path, id:image_id}, function(data) {
			window.location.href = "index.php";
		});
	}
}


