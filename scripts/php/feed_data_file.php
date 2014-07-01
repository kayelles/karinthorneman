<?php 
    
    /*  image should be an array containing four properties: id, source, desc, width
        and height
    */

    /* get and decode existing data */
    
    $filepath = 'data/imagedata.json';

    $delete = false;
    $append = true;
    
    $removeindex = '001';

    if (file_exists($filepath)) {
        $input = file_get_contents($filepath);
        $temparray = json_decode($input);
       
        if ($temparray == null) {
            $temparray = [];
        }

        if ($append) {

            $image = array();
            $image['id']        = "001";
            $image['src']       = "imagesource2";
            $image['desc']      = "description2";
            $image['width']     = "200";
            $image['height']    = "300";

            array_push($temparray, $image);
            
            $jsondata = json_encode($temparray);
            file_put_contents($filepath, $jsondata);
        }
        if ($delete) {
            /* remove section */

            $updated_array = delete_at_index($temparray, $removeindex);

            $jsondata = json_encode($updated_array);
            file_put_contents($filepath, $jsondata);
        }

        echo 'File updated with no errors';
    }
    else {
        echo 'Error while loading from file: ' . $filepath;
    }

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
            else {
                echo "Encountered a problem while reading data : unefined id\n";
            }
        }

        return $ret;
    }


?> 
