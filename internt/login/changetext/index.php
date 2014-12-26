<html>
    <head>
        <title>Karin Thorneman - ändra</title>
        <meta charset="utf-8">
	</head>
	<body>
		<h1>Ändra textinnehåll</h1>
        <form action="../index.php">
            <input type="submit" value="Tillbaka" />
        </form>
		<h2>Hem</h2>
        <?php
            session_start();

            if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] != true) {
                echo "<p>please log in to see this page</p>";
                die();
            }

			$filepath = '../../../data/text.json';
			$input = file_get_contents($filepath);
			$data_array = json_decode($input);

			if ($data_array == null or $data_array == false or empty((array)$data_array)) {
				echo '<p>[ Inget! ]</p>';
				$data_array = [];
			}
			echo "Förhandsvisning:";
			echo "<hr>";
			echo $data_array->texts->intro;
			echo "<hr>";
			foreach ($data_array as $val) {
				echo '<p>';
				$properties = get_object_vars($val);
			}
			echo '</p>';

        ?>
        <form   action="changetext.php" 
                method="post">
			</br>
            <textarea 	name="text" 
						value="" 
						rows="3" 
						cols="50" 
						wrap="physical"></textarea>
            <input  type="submit" 
                    value="ändra" />
            <input  type="hidden" 
                    name="action"
                    value="changehometext" /></br>
		</form>
		<h2>Om mig</h2>
        <?php
            session_start();

            if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] != true) {
                echo "<p>please log in to see this page</p>";
                die();
            }

			$filepath = '../../../data/text.json';
			$input = file_get_contents($filepath);
			$data_array = json_decode($input);

			if ($data_array == null or $data_array == false or empty((array)$data_array)) {
				echo '<p>[ Inget! ]</p>';
				$data_array = [];
			}
			echo "Förhandsvisning:";
			echo "<hr>";
			echo $data_array->texts->aboutme;
			echo "<hr>";
			foreach ($data_array as $val) {
				echo '<p>';
				$properties = get_object_vars($val);
			}
			echo '</p>';

        ?>
        <form   action="changetext.php" 
                method="post">
			</br>
            <textarea 	name="text" 
						value="" 
						rows="3" 
						cols="50" 
						wrap="physical"></textarea>
            <input  type="submit" 
                    value="ändra" />
            <input  type="hidden" 
                    name="action"
                    value="changeabouttext" /></br>
		</form>
		<h2>Utställningar</h2>
        <?php
            session_start();

            if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] != true) {
                echo "<p>please log in to see this page</p>";
                die();
            }

			$filepath = '../../../data/text.json';
			$input = file_get_contents($filepath);
			$data_array = json_decode($input);

			if ($data_array == null or $data_array == false or empty((array)$data_array)) {
				echo '<p>[ Inget! ]</p>';
				$data_array = [];
			}
			echo "Förhandsvisning:";
			echo "<hr>";
			echo $data_array->texts->exhibs;
			echo "<hr>";
			foreach ($data_array as $val) {
				echo '<p>';
				$properties = get_object_vars($val);
			}
			echo '</p>';
        ?>
        <form action="changetext.php" 
                method="post">
			</br>
            <textarea 	name="text" 
						value="" 
						rows="3" 
						cols="50" 
						wrap="physical"></textarea>
            <input  type="submit" 
                    value="ändra" />
            <input  type="hidden" 
                    name="action"
                    value="changeexhibtext" /></br>
		</form>
		<h2>Kontaktinformation</h2>
        <?php
            session_start();

            if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] != true) {
                echo "<p>please log in to see this page</p>";
                die();
            }

			$filepath = '../../../data/text.json';
			$input = file_get_contents($filepath);
			$data_array = json_decode($input);

			if ($data_array == null or $data_array == false or empty((array)$data_array)) {
				echo '<p>[ Inget! ]</p>';
				$data_array = [];
			}
			echo "Förhandsvisning:";
			echo "<hr>";
			echo $data_array->texts->contact;
			echo "<hr>";
        ?>
        <form action="changetext.php" 
                method="post">
			</br>
            <textarea 	name="text" 
						value="" 
						rows="3" 
						cols="50" 
						wrap="physical"></textarea>
            <input  type="submit" 
                    value="ändra" />
            <input  type="hidden" 
                    name="action"
                    value="changecontacttext" /></br>
		</form>
		</br>
		</br>
		</br>
		</br>
    </body>
</html>
