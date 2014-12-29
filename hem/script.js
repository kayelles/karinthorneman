

$(document).ready(function() {
    $.ajax({
        "type" : "get",
		"datatype" : "json",
		"async" : "false",
        "url" : "../data/homeimagedata.json",
        "success" : function(imagedata) {
			if (imagedata.length > 0) {
				$("#image").prepend('<img src="' + imagedata[0].src + '"</img>');
				$("#description").append('<p>' + imagedata[0].desc + '</p>');
			}
			$.ajax({
				"type" : "get",
				"url" : "../data/text.json",
				"success" : function(data) {
					$("#text").prepend(data.texts.intro);
					if (data.texts.visible === "false") {
						$("#text2").css("visibility", "hidden");
					}
					else {
						$("#text2").css("visibility", "visible");
						$("#text2").prepend(data.texts.intro2);
						var big = Math.max($("#text").height(), $("#image").height());
						if (big + $("#text2").height() > 700) {
							$("#container").css("height", 
												1225 + ($("#text2").height() + big - 700));
						}
						else {
							$("#container").css("height", 1225);
						}
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
