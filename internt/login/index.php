<?php
    session_start();

    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] != true) {
        echo "<p>please log in to see this page</p>";
        die();
    }

?>

<!doctype html>

<html lang="sv">
    <head>
        <title>Karin Thorneman - Interna funktioner</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h3>Välkommen</h3>
        <form action="add/index.php" method="post">
            <input  type="submit" 
                    name="addImage"
                    value="Ladda upp bilder" /></br>
            <input  type="hidden" 
                    name="action"
                    value="add" /></br>
        </form>
        <form action="remove/index.php" method="post">
            <input  type="submit" 
                    name="removeImage"
                    value="Ta bort bilder" /></br>
            <input  type="hidden" 
                    name="action"
                    value="remove" /></br>
		</form>
		<form action="changecategory/index.php" method="post">
			<input	type="submit"
					name="changecategory"
					value="Lägg till eller ta bort bildkategorier" /></br>
            <input  type="hidden" 
                    name="action"
                    value="changecategory" /></br>
		</form>
		<form action="changetext/index.php" method="post">
			<input	type="submit"
					name="changetext"
					value="Ändra textinnehåll" /></br>
            <input  type="hidden" 
                    name="action"
                    value="changetext" /></br>
		</form>
        <form action="logout.php" method="post">
            <input  type="submit" 
                    name="logout"
                    value="Logga ut" /></br>
        </form>
    </body>
</html>
