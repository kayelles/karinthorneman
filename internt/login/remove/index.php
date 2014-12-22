<?php
    session_start();

    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] != true) {
        echo "please log in to see this page</br>";
        die();
    }
?>

<!doctype html>

<html lang="en">
    <head>
        <title>Karin Thorneman</title>
        <meta charset   =utf-8>
        <link   type    ="text/css" 
                rel     ="stylesheet" 
                href    ="../../../stylesheet.css"
                media   ="screen" />
        <link   type    ="text/css" 
                rel     ="stylesheet" 
                href    ="stylesheet.css"
                media   ="screen" />
        <link   rel     ="stylesheet" 
                href    ="../../../fonts/octicons/octicons.css" />
    </head>
    <body>
        <noscript>
            <h1>This site requires Javascript to function properly</h1>
        </noscript>
        <div id = "container"> 
            <div id="header">
				<h2>Ta bort bilder</h2>
				<p>Tryck på den bild du vill ta bort</p>
            </div>
        
			<div id="images">
			</div>

        </div>
        <script language = "javascript" 
                src = "../../../scripts/js/jquery-1.11.1.min.js">
        </script>
        <script language = "javascript"
                src = "script.js">
        </script>
    </body>
</html>

