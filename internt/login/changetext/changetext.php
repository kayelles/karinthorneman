
<?php
    session_start();

	$action = $_POST['action'];
	if ($action == "changehometext" 
		or $action == "changeabouttext" 
		or $action == "changecontacttext" 
   		or $action == "changeexhibtext") {
		$newtext = $_POST['text'];
		$filepath = '../../../data/text.json';
	}
	else {
		die("Unknown action");
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
	file_put_contents($filepath, $jsondata) 
		or die("failed to write to file");
	header("Location: index.php");
?>
