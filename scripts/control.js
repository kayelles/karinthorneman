var path = window.location.pathname;
var arr = path.split("/");
arr.pop();
var page = arr.pop();

switch (page) {
    case "karinthorneman":
        // handle
        break;
    case "hem":
        // handle
        break;
    case "malningar":
        // handle
        break;
    case "studio":
        // handle
        break;
    case "utstallningar":
        // handle
        break;
    case "kontakt":
        // handle
        break;
    default:
        alert("Page Error");
        break;
}
