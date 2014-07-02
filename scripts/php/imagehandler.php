<?php

    // VARIABLES
    
    $readpath = 'images/woman.jpg';
    $percentage = 87;

    $resizefactor = $percentage / 100;
    
    $imagesize = getimagesize($readpath);

    $width = $imagesize[0];
    $height = $imagesize[1];

    $new_width = intval($width * $resizefactor);
    $new_height = intval($height * $resizefactor);

    $filter = Imagick::FILTER_LANCZOS;

    resizeImage($readpath, $new_width, $new_height, $filter);


/*

    ----this section controls and handles post data ---------

    if(isset($_POST['action']) && !empty($_POST['action'])) {
        $action = $_POST['action'];
        switch($action) {
            case 'resizeImage':
                resizeImage();
                break;
            default:
                echo 'unknown action' . "\n";
                break;
        }
    }
*/
    
    function resizeImage($path, $width, $height, $filter) {
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
