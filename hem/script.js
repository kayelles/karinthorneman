

$(document).ready(function() {
    $.ajax({
        "type" : "get",
		"datatype" : "json",
		"async" : "false",
        "url" : "../data/homeimagedata.json",
        "success" : function(data) {
			$("#image").prepend('<img src="' + data[0].src + '"</img>');
			$("#description").append('<p>' + data[0].desc + '</p>');
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
