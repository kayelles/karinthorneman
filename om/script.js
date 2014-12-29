
$(document).ready(function() {
    $.ajax({
        "type" : "get",
		"datatype" : "json",
		"async" : "false",
        "url" : "../data/karinimagedata.json",
        "success" : function(imagedata) {
			if (imagedata.length > 0) {
				$("#image").prepend('<img src="' + imagedata[0].src + '"</img>');
			}
			$.ajax({
				"type" : "get",
				"url" : "../data/text.json",
				"success" : function(data) {
					$("#text").append(data.texts.aboutme);
					$("#exhib").append(data.texts.exhibs);
					$("#contactinfo").append(data.texts.contact);
					var big = Math.max($("#exhib").height(), $("#contactinfo").height());
					if (big > 250) {
						$("#container").css("height", 1225 + (big - 250));
					}
					else {
						$("#container").css("height", 1225);
					}
				},
				"error" : function(data) {
					alert("Error: Content could not be loaded");
				}
			});
        },
        "error" : function(data) {
            alert("Error: Content could not be loaded");
        }
    });
	return false;
});
