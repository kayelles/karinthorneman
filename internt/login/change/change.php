
<?php
	
    session_start();

	$categoryname = $_POST['category'];
	$action = $_POST['action'];
	$pattern = '/[a-zA-Z0-9\s]+/';
	$filepath = '../../../data/categories.json';
	$input = file_get_contents($filepath);
	$data_array = json_decode($input);
	if ($data_array == null or $data_array == false or empty((array)$data_array)) {
		$data_array = [];
	}
	if ($action == "add") {	
		if (preg_match($pattern, $categoryname)) { 
			$category = array();
			$category['name'] = $categoryname;
			array_push($data_array, $category);
			$jsondata = json_encode($data_array);
			file_put_contents($filepath, $jsondata) 
				or die("failed to write to file");
		}
		else {
			die("Invalid input name");
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
		$jsondata = json_encode($res);
		file_put_contents($filepath, $jsondata) 
			or die("failed to write to file");
	}
	header("Location: index.php");
?>
