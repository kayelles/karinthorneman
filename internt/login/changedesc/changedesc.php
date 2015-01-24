<?php

    $data_filepath = "../../../data/imagedata.json";
    $image_filepath = $_POST['path'];
    $image_id = intval($_POST['id']);
   	
    $input = file_get_contents($data_filepath);

    $data_array = json_decode($input);

    $updated_data_array = changedesc_at_id($data_array, $image_id);


    if ($updated_data_array == null) {
        $updated_data_array = [];
    }
    $jsondata = json_encode($updated_data_array);
	
    file_put_contents($data_filepath, $jsondata) or die("failed to write to file");
    
    function changedesc_at_id($array, $id) {
        $ret = [];
        for ($i = 0; $i < count($array); $i++) {
            $image = $array[$i];
            $image_properties = get_object_vars($image);
            if (array_key_exists('id', $image_properties)) {
                if ($image_properties['id'] == $id) {
                    $image->desc = "<p>" . $_POST['desc'] . "</p>"; 
                }
                array_push($ret, $image);
            }
        }
        return $ret;
    }
?>
