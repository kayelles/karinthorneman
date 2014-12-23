<html>
    <head>
        <title>Karin Thorneman - ändra</title>
        <meta charset="utf-8">
    </head>
    <body>
		<h2>Ändra kategorier eller textinnehåll</h2>
		<p>Lägg till en kategori för bilder</p>
        <?php
            session_start();

            if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] != true) {
                echo "<p>please log in to see this page</p>";
                die();
            }

			$filepath = '../../../data/categories.json';
			$input = file_get_contents($filepath);
			$data_array = json_decode($input);

			echo '<p>Existerande kategorier:</p>';

			if ($data_array == null or $data_array == false or empty((array)$data_array)) {
				echo '<p>[ Inga just nu! ]</p>';
				$data_array = [];
			}

			foreach ($data_array as $val) {
				echo '<p>';
				$properties = get_object_vars($val);
				echo '*' . $properties['name'] . '</br>';
			}
				echo '</p>';

        ?>
        <form   action="change.php" 
                method="post">
			</br>
			<input  type="text"
					name="category" />
            <input  type="submit" 
                    value="Lägg till" />
            <input  type="hidden" 
                    name="action"
                    value="add" /></br>
        </form>
		<p>Ta bort en kategori för bilder</p>
        <form   action="change.php" 
                method="post">
			</br>
			<input  type="text"
					name="category" />
            <input  type="submit" 
                    value="Ta bort" />
            <input  type="hidden" 
                    name="action"
                    value="remove" /></br>
        </form>
        <form action="../index.php">
            <input type="submit" value="Tillbaka" />
        </form>
        
    </body>
</html>
