
<?php
	
    session_start();
	try {
		$action = $_POST['action'];
		if ($action == "add" or $action == "remove") {
			$pattern = '/^[a-zåäöÅÄÖA-Z0-9\s]+$/';
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
				$exists = false;
				foreach ($data_array as $val) {
					$properties = get_object_vars($val);
					if ($properties['name'] == $categoryname) {
						$exists = true;
					}
				}
				if (!$exists) {
					$res = $data_array;
					$category = array();
					$category['name'] = $categoryname;
					array_push($res, $category);
				}
				else {
					throw new RuntimeException('Kategorin existerar redan');
				}
			}
			else {
				throw new RuntimeException('Ej tillåtet kategorinamn. Namnet får bara 
				   innehålla bokstäver och nummer');
			}
		} 
		else if ($action == "remove") {
			$res = array();
			//First check if array contains the value
			$exists = false;
			foreach ($data_array as $val) {
				$properties = get_object_vars($val);
				if ($properties['name'] == $categoryname) {
					$exists = true;
				}
			}
			if ($exists) {
				foreach ($data_array as $val) {
					$properties = get_object_vars($val);
					if ($properties['name'] != $categoryname) {
						array_push($res, $val);
					}
				}
			}
			else {
				$res = $data_array;
				throw new RuntimeException('Kategorin existerar inte');
			}
		}
		$jsondata = json_encode($res);
		file_put_contents($filepath, $jsondata) 
			or die("failed to write to file");
		header("Location: index.php");
	}
	catch (RuntimeException $e) {
		echo $e->getMessage();
		echo '<form action="index.php"><input type="submit" value="tillbaka" /></form>';
	}
?>
