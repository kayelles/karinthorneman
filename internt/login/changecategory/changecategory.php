
<?php
	
    session_start();

	$action = $_POST['action'];
	if ($action == "add" or $action == "remove") {
		$pattern = '/[a-zA-Z0-9\s]+/';
		$categoryname = $_POST['category'];
		$filepath = '../../../data/categories.json';
	}
	else {
		die("Unknown action");
	}
	$input = file_get_contents($filepath);
	$data_array = json_decode($input);
	if ($data_array == null or $data_array == false or empty((array)$data_array)) {
		$data_array = [];
	}
	if ($action == "add") {	
		if (preg_match($pattern, $categoryname)) { 
			$res = $data_array;
			$category = array();
			$category['name'] = $categoryname;
			array_push($res, $category);
		}
		else {
			die("Invalid category name. Name can contain letters and numbers");
		}
	} 
	else if ($action == "remove") {
		$res = array();
		foreach ($data_array as $val) {
			$properties = get_object_vars($val);
			if ($properties['name'] != $categoryname) {
				array_push($res, $val);
			}
		}
	}
	$jsondata = json_encode($res);
	file_put_contents($filepath, $jsondata) 
		or die("failed to write to file");
	header("Location: index.php");
?>
