<!doctype html>

<html>
	<head>
        <title>Intert</title>
        <meta charset=utf-8>
	</head>
	<body>
		<?php 
		session_start();
		$filepath = '../data/passwd.json';
		$username = $_POST['username'];
		$givenhash = sha1($_POST['password']);

		$input = file_get_contents($filepath);
		$data_array = json_decode($input);
		if ($data_array == null or $data_array == false or empty((array)$data_array)) {
			$data_array = new stdClass();
			$data_array->passwd = $givenhash;
			$_SESSION['loggedin'] = true;
			$_SESSION['username'] = $username;
			$jsondata = json_encode($data_array);
			$success = file_put_contents($filepath, $jsondata);
			if ($success) {
				header('Location: newpass.php');
			}
			else {
				echo 'Det har uppstått ett fel. Kontakta serveradministratören';
				echo '<form action="index.html">
					<input type="submit" value="tillbaka" /></form>';
				die();
			}
		} 
		else {
			$storedhash = $data_array->passwd;
			if ($username == 'karin' and $givenhash == $storedhash) {
				$_SESSION['loggedin'] = true;
				$_SESSION['username'] = $username;
				header('Location: login/index.php');
				die();
			}
			else {
				echo 'Fel användarnamn/lösenord';
				echo '<form action="index.html">
					<input type="submit" value="tillbaka" /></form>';
				die();
			}
		}
		?>
	<body>
</html>
