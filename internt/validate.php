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
			echo var_dump($data_array->passwd);
			$_SESSION['loggedin'] = true;
			$_SESSION['username'] = $username;
			$jsondata = json_encode($data_array);
			file_put_contents($filepath, $jsondata) 
				or die("failed to write to file");
			header('Location: newpass.php');
			die();
		} 
		else {
			$storedhash = $data_array->passwd;
			echo $username;
			echo $givenhash . "</br>";
			echo $storedhash . "</br>";
			if ($username == 'karin' and $givenhash == $storedhash) {
				$_SESSION['loggedin'] = true;
				$_SESSION['username'] = $username;
				header('Location: login/index.php');
				die();
			}
			else {
				echo 'Password or username is incorrect';
			}
		}
		?>
	<body>
</html>
