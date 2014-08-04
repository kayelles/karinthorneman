<?php

    $readpath = 'images/b2.jpg';
    $percentage = 133;
    $resizefactor = $percentage / 100;
    $imagesize = getimagesize($readpath);
    $width = $imagesize[0];
    $height = $imagesize[1];
    $new_width = intval($width * $resizefactor);
    $new_height = intval($height * $resizefactor);
    
    $filter = Imagick::FILTER_LANCZOS;
    $imgtool = new Imagick();

    if (file_exists($readpath)) {
        $imgtool->readImage($readpath);
        $imgtool->resizeImage($new_width, $new_height, $filter, 1);
        $imgtool->writeImage('images/b2new.jpg');
        $imgtool->clear();
        $imgtool->destroy();
        echo 'attempt to resize image successful' . "\n";
    }
    else {
        echo 'Cannot read from file' . "\n";
    }

?>
