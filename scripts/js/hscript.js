

$(document).ready(function() {
    $.ajax({
        "type" : "get",
        "url" : "../data/text.json",
        "success" : function(data) {
            $(".text").append(data.texts.intro);
        },
        "error" : function(data) {
            alert("Error: Content could not be loaded");
        }
    });
    $.ajax({
        "type" : "post",
        "url" : "../scripts/php/imagehandler.php",
        "data" : {action : "resizeImage"},
        "success" : function(data) {
            $(".image").append('<img src="' + "../images/b3.jpg" + '" />');
            alert(data);
        },
        "error" : function() {
            alert("Error: cannot execute script");
        }
    });
});
