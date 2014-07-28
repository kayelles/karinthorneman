<?php

    global  $temparray, $filepath, $imageid, $imagesrc, $imagedesc, 
            $imagewidth, $imageheight;


    function addImage(  $filepath, 
                        $imageid, 
                        $imagesrc, 
                        $imagedesc, 
                        $imagewidth, 
                        $imageheight    ) {

        if (file_exists($filepath)) {
            $input = file_get_contents($filepath);
            $temparray = json_decode($input);

            if ($temparray == null) {
                $temparray = [];
            }
           
            $image = array();
            $image['id']        = $imageid; 
            $image['src']       = $imagesrc;
            $image['desc']      = $imagedesc;
            $image['width']     = $imagewidth;
            $image['height']    = $imageheight;
            array_push($temparray, $image);
            $jsondata = json_encode($temparray);
            file_put_contents($filepath, $jsondata) 
                or die("failed to write to file");

        }
        else {
            echo 'Error while loading from file: ' . $filepath;
        }
    }

?>
