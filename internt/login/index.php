<?php
    session_start();

    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
        echo "Welcome to the members area</br>";
    }
    else {
        echo "please log in to see this page</br>";
        die();
    }
?>

<!doctype html>

<html lang="sv">
    <head>
        <title>Intert</title>
        <meta charset   =utf-8>
    </head>
    <body>
        <form action="imagehandler.php" method="post">
            <input  type="submit" 
                    name="addImage"
                    value="Add pictures" /></br>
            <input  type="hidden" 
                    name="action"
                    value="add" /></br>
        </form>
        <form action="imagehandler.php" method="post">
            <input  type="submit" 
                    name="removeImage"
                    value="Remove pictures" /></br>
            <input  type="hidden" 
                    name="action"
                    value="remove" /></br>
        </form>
        <form action="main.php" method="post">
            <input  type="submit" 
                    name="resizeImage"
                    value="rezise pics" /></br>
            <input  type="hidden" 
                    name="action" 
                    value="resize" /></br>
        </form>
        <form action="logout.php" method="post">
            <input  type="submit" 
                    name="logout"
                    value="Log out" /></br>
        </form>
    </body>
</html>
