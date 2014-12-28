

$(document).ready(function() {
    $.ajax({
        "type" : "get",
		"datatype" : "json",
		"async" : "false",
        "url" : "../data/homeimagedata.json",
        "success" : function(imagedata) {
			$("#image").prepend('<img src="' + imagedata[0].src + '"</img>');
			$("#description").append('<p>' + imagedata[0].desc + '</p>');
			$.ajax({
				"type" : "get",
				"url" : "../data/text.json",
				"success" : function(data) {
					$("#text").prepend(data.texts.intro);
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
