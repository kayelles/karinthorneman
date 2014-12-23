<html>
    <head>
        <title>Lägg till bilder</title>
        <meta charset="utf-8">
    </head>
    <body>
        <?php
            session_start();

            if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] != true) {
                echo "<p>please log in to see this page</p>";
                die();
            }

        ?>
		<h2>Lägg till bilder</h2>
        <p>Välj en bild att ladda upp</p>
        <form   enctype="multipart/form-data" 
                action="uploader.php" 
                method="post">
            <input  type="file" 
                    name="uploadedfile" />
            </br>
            </br>
            <p>Ge bilden en beskrivning:</p>
            <textarea 	name="description" 
						value="" 
						rows="3" 
						cols="50" 
						wrap="physical"></textarea>
            </br>
            </br>
            <p>Välj utställning:</p>
            <select size="2" name="exhib">
                <option selected="selected" value="2014">2014</option>
                <option value="2010">2010</option>
            </select>
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
