var images = [];

images.push("../images/1.jpg");
images.push("../images/2.jpg");
images.push("../images/3.jpg");
images.push("../images/4.jpg");
images.push("../images/5.jpg");

var img = document.createElement("img");
img.src = images[0];
var div = document.getElementById('images');
div.className = "painting";
div.appendChild(img);

