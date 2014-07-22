<?php

    header('Content-Type: text/plain; charset=utf-8');

    // VARIABLES
    
    $filepath = '../data/imagedata.json';

    $imageid        = "006";
    $imagesrc       = '../images/tavlor/t07.jpg';
    $imagedesc      = "betjäning under maktnes kupol 120 x 130 akriyl på duk";
    $imagewidth     = "588";
    $imageheight    = "640";

    if(isset($_POST['action']) && !empty($_POST['action'])) {
        update_data_file($_POST['action']);
    }
    else {
        echo 'ERROR: action not set or empty';
    }

    function update_data_file($action) {
        global  $temparray, $filepath, $imageid, $imagesrc, $imagedesc, 
                $imagewidth, $imageheight;

        if (file_exists($filepath)) {
            $input = file_get_contents($filepath);
            $temparray = json_decode($input);

            if ($temparray == null) {
                $temparray = [];
            }
           
            if (strcmp($action, "add") == 0) {
                $image = array();
                $image['id']        = $imageid; 
                $image['src']       = $imagesrc;
                $image['desc']      = $imagedesc;
                $image['width']     = $imagewidth;
                $image['height']    = $imageheight;
                array_push($temparray, $image);
            }
            else if (strcmp($action, "remove") == 0) {
                $temparray = delete_at_index($temparray, "007");
            }
            else {
                echo "unknown action";
            }
            $jsondata = json_encode($temparray);
            file_put_contents($filepath, $jsondata) 
                or die("failed to write to file");

            echo 'File updated with no errors';
        }
        else {
            echo 'Error while loading from file: ' . $filepath;
        }
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

    function resizeImage($path, $width, $height, $filter) {

        $readpath = 'images/reflexion.jpg';
        $percentage = 90;
        $resizefactor = $percentage / 100;
        $imagesize = getimagesize($readpath);
        $width = $imagesize[0];
        $height = $imagesize[1];
        $new_width = intval($width * $resizefactor);
        $new_height = intval($height * $resizefactor);
        $filter = Imagick::FILTER_LANCZOS;

        $imgtool = new Imagick();
        if (file_exists($path)) {
            $imgtool->readImage($path);
            $imgtool->resizeImage($width, $height, $filter, 1);
            $imgtool->writeImage($path);
            $imgtool->clear();
            $imgtool->destroy();
            echo 'attempt to resize image successful' . "\n";
        }
        else {
            echo 'Cannot read from file' . "\n";
        }
    }
?>
