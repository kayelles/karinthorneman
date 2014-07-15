

$(document).ready(function() {
    $.ajax({
        "type" : "get",
        "url" : "../data/text.json",
        "success" : function(data) {
            $("#text").append(data.texts.intro);
            if ($(window).height() > 1000) {
                $("#container").css("height", $(window).height());
            }
            else {
                $("#container").css("height", 1000);
            }
        },
        "error" : function(data) {
            alert("Error: Content could not be loaded");
        }
    });
});
