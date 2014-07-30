<?php

    $data_filepath = "../../../data/imagedata.json";
    $image_filepath = $_POST['path'];
    $image_index = intval($_POST['index']) + 1;
    
    // Remove the file from uploads
    unlink($image_filepath) or die("Could not delete the image");

    // Remove the files data from the json file

    $input = file_get_contents($data_filepath);

    $data_array = json_decode($input);

    $update_data_array = delete_at_index($data_array, $image_index);

    if ($updated_data_array == null) {
        $updated_data_array = [];
    }

    $jsondata = json_encode($updated_data_array);

    file_put_contents($data_filepath, $jsondata) 
        or die("failed to write to file");
    
    function delete_at_index($array, $index) {
        $ret = [];
        for ($i = 0; $i < count($array); $i++) {
            $image = $array[$i];
            $image_properties = get_object_vars($image);
            if (array_key_exists('id', $image_properties)) {
                if ($image_properties['id'] != $index) {
                    array_push($ret, $image);
                }
            }
        }
        return $ret;
    }
?>
