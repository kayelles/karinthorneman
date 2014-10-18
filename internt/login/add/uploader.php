<?php
    session_start();

try {
   
    // Undefined | Multiple Files | $_FILES Corruption Attack
    // If this request falls under any of them, treat it invalid.
    if (!isset( $_FILES['uploadedfile']['error']) ||
                is_array($_FILES['uploadedfile']['error'])) {
        throw new RuntimeException('Invalid parameters.');
    }

    // Check $_FILES['upfile']['error'] value.
    switch ($_FILES['uploadedfile']['error']) {
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_NO_FILE:
            throw new RuntimeException('No file sent.');
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            throw new RuntimeException('Exceeded filesize limit.');
        default:
            throw new RuntimeException('Unknown errors.');
    }

    // You should also check filesize here.
    if ($_FILES['uploadedfile']['size'] > 1000000) {
        throw new RuntimeException('Exceeded filesize limit.');
    }

    // DO NOT TRUST $_FILES['upfile']['mime'] VALUE !!
    // Check MIME Type by yourself.
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    if (false === $ext = array_search(
        $finfo->file($_FILES['uploadedfile']['tmp_name']),
        array(
            'jpg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
        ),
        true
    )) {
        throw new RuntimeException('Invalid file format.');
    }
    
    $imagehash = sha1_file($_FILES['uploadedfile']['tmp_name']);

    // You should name it uniquely.
    // DO NOT USE $_FILES['upfile']['name'] WITHOUT ANY VALIDATION !!
    // On this example, obtain safe unique name from its binary data.
    if (!move_uploaded_file(
        $_FILES['uploadedfile']['tmp_name'],
        sprintf('../../../uploads/%s.%s', $imagehash, $ext))
        ) {
        throw new RuntimeException('Failed to move uploaded file.');
    }


    $filesrc = $imagehash . "." . $ext;
    $filesrc_rel_datadir = "../uploads/" . $filesrc;
    $filesrc_rel_uploaddir = "../../../uploads/" . $filesrc;

    $size = getimagesize($filesrc_rel_uploaddir);
    $width = $size[0];
    $height = $size[1];

    addImage(   "../../../data/imagedata.json", 
                $_POST['exhib'],
                $filesrc_rel_datadir, 
                "<p>" . $_POST['description'] . "</p>",
                $width,
                $height );

    $_SESSION['upload_message'] = "Filen har laddats upp";
    header("Location: index.php");
} 
catch (RuntimeException $e) {
    echo $e->getMessage();
    $_SESSION['upload_message'] = "Filen kunde inte laddas upp. Kontakta serveradministratören";
}

function addImage(  $filepath, 
                    $imageexh,
                    $imagesrc, 
                    $imagedesc, 
                    $imagewidth, 
                    $imageheight    ) {

    if (file_exists($filepath)) {
        $input = file_get_contents($filepath);
        $data_array = json_decode($input);

        if ($data_array == null) {
            $data_array = [];
        }
       
        //Block that calculates the id of the uploaded image

        $largestID = 0;

        for ($i = 0; $i < count($data_array); $i++) {
            $image = $data_array[$i];
            $image_properties = get_object_vars($image);
            if (array_key_exists('id', $image_properties)) {
                if ($image_properties['id'] > $largestID) {
                    $largestID = $image_properties['id'];
                }
            }
        }

        $image = array();
        $image['id']        = (string)($largestID + 1); 
        $image['exh']       = $imageexh;
        $image['src']       = $imagesrc;
        $image['desc']      = $imagedesc;
        $image['width']     = $imagewidth;
        $image['height']    = $imageheight;
        array_push($data_array, $image);
        $jsondata = json_encode($data_array);
        file_put_contents($filepath, $jsondata) 
            or die("failed to write to file");

    }
    else {
        echo 'Error while loading from file: ' . $filepath;
    }
}

?>
