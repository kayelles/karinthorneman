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
		<h1>Interna funktioner</h1>
        <form action="logout.php" method="post">
            <input  type="submit" 
                    name="logout"
                    value="Logga ut" /></br>
		</form>
		<hr>
		</br>
		</br>
        <form action="add/index.php" method="post">
            <input  type="submit" 
                    name="addImage"
                    value="Ladda upp bilder till galleri" /></br>
            <input  type="hidden" 
                    name="action"
                    value="add" /></br>
        </form>
        <form action="remove/index.php" method="post">
            <input  type="submit" 
                    name="removeImage"
                    value="Ta bort bilder från galleri" /></br>
            <input  type="hidden" 
                    name="action"
                    value="remove" /></br>
		</form>
        <form action="changepic/index.php" method="post">
            <input  type="submit" 
                    name="changeImage"
                    value="Ändra andra bilder" /></br>
            <input  type="hidden" 
                    name="action"
                    value="changepic" /></br>
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
		</br>
		<h2>Formatteringshjälp:</h2>
		<h3>För en stor rubrik</h3>
		<p>&lth1&gt<i>text</i>&lt/h1&gt</p>
		<h3>För en mellan rubrik</h3>
		<p>&lth2&gt<i>text</i>&lt/h2&gt</p>
		<h3>För en liten rubrik</h3>
		<p>&lth3&gt<i>text</i>&lt/h3&gt</p>
		<h3>För en paragraf</h3>
		<p>&ltp&gt<i>text</i>&lt/p&gt</p>
		<h3>Radbyte</h3>
		<p>&lt/br&gt</p>
    </body>
</html>
