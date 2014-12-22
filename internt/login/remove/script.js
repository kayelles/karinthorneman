
/* Script for the remove image page */

// global variables

var imageCount = 0;
var screenheight = 0;
var imageList = [];

/*	The object that is to be loaded with server data*/

var imageData = {
	"ids"			: [],
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
	addImages();
}

/*
    Appends images to the webpage
*/

function getImagedata() {
    imageCount  = 0;
    for (i = 0; i < imageData["paths"].length; i++) {
		var imagetag = '<img class="clickable" src="' + 
						"../../" + imageData["paths"][i] + '" />';
		imageCount++;
		imageList.push(imagetag);
    }
}

/* Displays an image with index index  */

function addImages() {
	for (i = 0; i < imageList.length; i++) {
		$("#images").append(imageList[i]);
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
	ans = window.confirm("är du sáker?");
	if (ans) {
		image_path = caller.attr("src");
		image_id = getIDFromPath(image_path);
		console.log(image_id);
		console.log(image_path);
		$.post("remove.php", {path:image_path, id:image_id}, function(data) {
			console.log(data);
			window.location.href = "index.php";
		});
	}
}


