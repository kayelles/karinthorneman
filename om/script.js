
$(document).ready(function() {
    $.ajax({
        "type" : "get",
        "url" : "../data/text.json",
        "success" : function(data) {
            $("#text").append(data.texts.aboutme);
            $("#container").css("min-height", $(window).height());
        },
        "error" : function(data) {
            alert("Error: Content could not be loaded");
        }
    });
});
