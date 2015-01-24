
<?php
    session_start();
	try {
		$action = $_POST['action'];
		if ($action == "changehometext" 
			or $action == "changehometext2" 
			or $action == "changeabouttext" 
			or $action == "changecontacttext" 
			or $action == "changeexhibtext") {
			$newtext = $_POST['text'];
			$filepath = '../../../data/text.json';
		}
		else {
			throw new RuntimeException('Okänt fel');
		}
		$input = file_get_contents($filepath);
		$data_array = json_decode($input);
		if ($data_array == null or $data_array == false or empty((array)$data_array)) {
			$data_array = [];
		}
		else if ($action == "changehometext") {
			$res = $data_array;
			$res->texts->intro = $newtext;
		}
		else if ($action == "changehometext2") {
			$res = $data_array;
			if (isset($_POST['visible'])) {
                $res->texts->visible = "true";
                $res->texts->flag= "1";
			}
			else {
                $res->texts->flag= "0";
				$res->texts->visible = "false";
			}
			$res->texts->intro2 = $newtext;
		}
		else if ($action == "changeabouttext") {
			$res = $data_array;
			$res->texts->aboutme = $newtext;
		}
		else if ($action == "changeexhibtext") {
			$res = $data_array;
			$res->texts->exhibs = $newtext;
		}
		else if ($action == "changecontacttext") {
			$res = $data_array;
			$res->texts->contact = $newtext;
		}
		$jsondata = json_encode($res);
		$success = file_put_contents($filepath, $jsondata);
		if ($success) {
			header("Location: index.php");
		}
		else {
			throw new RuntimeException('Internt fel. Kontakta Webmaster');
		}
	}
	catch (RuntimeException $e) {
		echo $e->getMessage();
		echo '<form action="index.php"><input type="submit" value="tillbaka" /></form>';
		$_SESSION['upload_message'] = "Filen kunde inte laddas upp.";
	}
?>
