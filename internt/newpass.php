
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
		<h2>Nytt lösenord skapat till 'karin'</h2>
        <form action="login/index.php">
            <input type="submit" value="Gå vidare" />
        </form>
	</body>
</html>
