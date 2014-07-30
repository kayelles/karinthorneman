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
                <p>Bläddra till den bild du vill ta bort och klicka på krysset eller tryck
                på returtangenten</p>
            </div>
        
            <div id="contentHolder">
                <div id="control">
                    <ul id="exhibitions">
                        <li id="1" class="clickable">Utställning 2014</li>
                        <li id="2" class="clickable">Utställning 2010</li>
                    </ul>
                    <div id="arrowHolder" class="holder">
                        <span class="mega-octicon octicon-chevron-left 
                                        clickable">
                        </span>
                        <span id="whichimage" class="fadeout"></span>
                        <span class="mega-octicon octicon-chevron-right 
                                        clickable">
                        </span>
                    </div>
                    <div id="remover" class="mega-octicon octicon-x clickable"></div>
                    </br>
                    <form id="back" method="get" action="../index.php">
                        <input type="submit" value="tillbaka" />
                    </form>
                </div>
                <div id="images">
                    <div id="imageWrapper" class="clickable"></div>
                </div>
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

