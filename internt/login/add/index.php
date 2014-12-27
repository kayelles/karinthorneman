<!doctype html>
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
		<h1>Lägg till bilder</h1>
        <form action="../index.php">
            <input type="submit" value="Tillbaka" />
        </form>
		<hr>
		</br>
		</br>
        <h2>Välj en bild att ladda upp</h2>
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
			<?php 
				$filepath = '../../../data/categories.json';
				$input = file_get_contents($filepath);
				$data_array = json_decode($input);
				echo '<select size="' . count($data_array) . '" name="exhib">';
				foreach ($data_array as $val) {
					$acc = array();
					$properties = get_object_vars($val);
						echo '<option selected="selected" value="' 
							. $properties['name'] 
							. '">' . $properties['name']
						    . '</option>';
				}
			?>
            </select>
            </br>
            </br>
            <input  type="submit" 
                    value="Ladda upp" />
        </form>
    </body>
</html>
