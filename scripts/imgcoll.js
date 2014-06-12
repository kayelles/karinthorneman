var images = [];

images.push("../images/1.jpg");
images.push("../images/2.jpg");
images.push("../images/3.jpg");
images.push("../images/4.jpg");
images.push("../images/5.jpg");

var imageHolder = $("#imageHolder");
var leftPrt = $("#subHolder1");
var middlePrt = $("#subHolder2");
var rightPrt = $("#subHolder3");
var rightArrow = $("#rightArrow");
var leftArrow = $("#leftArrow");

var imgSrc = images[3];

leftPrt.css("background-image", "url(" + imgSrc + ")");
middlePrt.css("background-image", "url(" + imgSrc + ")");
rightPrt.css("background-image", "url(" + imgSrc + ")");


var img = new Image();
img.onload = function() {
    var imageWidth  = this.width;
    var imageHeight = this.height;
    leftPrt.css({
        "height" : imageHeight,
        "width"  : imageWidth / 6
    });
    middlePrt.css({
        "height" : imageHeight,
        "width"  : 4*imageWidth / 6,
        "background-position" : -(imageWidth/6),
    });
    rightPrt.css({
        "height" : imageHeight,
        "width"  : imageWidth / 6,
        "background-position" : -(5*imageWidth/6),
    });
    rightArrow.css({
        "top" : (imageHeight / 2) + 200,
        "left" : imageWidth + 60,
    });
    leftArrow.css({
        "top" : (imageHeight / 2) + 200,
        "left" : 100,
    });
}

img.src = imgSrc;

leftPrt.click(function() {
    alert("left was clicked");
});
rightPrt.click(function() {
    alert("right was clicked");
});

