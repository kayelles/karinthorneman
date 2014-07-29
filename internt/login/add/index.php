<?php
    session_start();

    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] != true) {
        echo "<p>please log in to see this page</p>";
        die();
    }

?>
<html>
    <head>
        <title>Lägg till bilder</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h3>Välj en bild att ladda upp</h3>
        <form   enctype="multipart/form-data" 
                action="uploader.php" 
                method="post">
            <input  type="file" 
                    name="uploadedfile" />
            </br>
            </br>
            <p>Ge bilden en beskrivning:</p>
            <textarea   name="description" 
                        value=""
                        rows="4"
                        cols="40" >
            </textarea>
            </br>
            </br>
            <input  type="submit" 
                    value="Ladda upp" />

        </form>
        <form action="../index.php">
            <input type="submit" value="Tillbaka" />
        </form>
    </body>
</html>
