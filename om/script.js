
$(document).ready(function() {
    $.ajax({
        "type" : "get",
        "url" : "../data/text.json",
        "success" : function(data) {
            $("#text").append(data.texts.aboutme);
            $("#exhib").append(data.texts.exhibs);
            $("#contactinfo").append(data.texts.contact);
        },
        "error" : function(data) {
            alert("Error: Content could not be loaded");
        }
    });
});
