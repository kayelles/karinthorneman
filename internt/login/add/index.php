<?php
    session_start();

    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
        echo "<p>Select an image to add</p>";
    }
    else {
        echo "please log in to see this page</br>";
        die();
    }
?>
<html>
    <head>
    </head>
    <body>
        <form   enctype="multipart/form-data" 
                action="uploader.php" 
                method="post">
            <input  type="file" 
                    name="uploadedfile" />
            </br>
            </br>
            <textarea   name="description" 
                        value=""
                        size="20"
                        rows="4"
                        cols="40" >Give the image a description
            </textarea>

            </br>
            </br>
            <input  type="submit" 
                    value="Upload" />

        </form>
        <form action="../index.php">
            <input type="submit" value="Back" />
        </form>
    </body>
</html>
