<?php
    session_start();

try {
   
    // Undefined | Multiple Files | $_FILES Corruption Attack
    // If this request falls under any of them, treat it invalid.
    if (!isset( $_FILES['uploadedfile']['error']) ||
                is_array($_FILES['uploadedfile']['error'])) {
        throw new RuntimeException('Fel parametrar.');
    }

    // Check $_FILES['upfile']['error'] value.
    switch ($_FILES['uploadedfile']['error']) {
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_NO_FILE:
            throw new RuntimeException('Ingen fil har skickats.');
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            throw new RuntimeException('Filen är för stor. Maxstorlek: 1MB');
        default:
            throw new RuntimeException('Okänt fel.');
    }

    // You should also check filesize here.
    if ($_FILES['uploadedfile']['size'] > 1000000) {
		throw new RuntimeException('Filen är för stor. Maxstorlek: 1MB');
    }
	$imagehash = sha1_file($_FILES['uploadedfile']['tmp_name']);

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
        throw new RuntimeException('Fel filformat. Tillåtna format: .jpeg .png .gif');
    }
    
    // You should name it uniquely.
    // DO NOT USE $_FILES['upfile']['name'] WITHOUT ANY VALIDATION !!
    // On this example, obtain safe unique name from its binary data.
    if (!move_uploaded_file(
        $_FILES['uploadedfile']['tmp_name'],
        sprintf('../../../uploads/singles/%s.%s', $imagehash, $ext))
        ) {
        throw new RuntimeException('Misslyckades att ladda upp fil.');
    }


    $filesrc = $imagehash . "." . $ext;
    $filesrc_rel_datadir = "../uploads/singles/" . $filesrc;
    $filesrc_rel_uploaddir = "../../../uploads/singles/" . $filesrc;

    $size = getimagesize($filesrc_rel_uploaddir);
    $width = $size[0];
    $height = $size[1];
    addImage(   "../../../data/karinimagedata.json", 
                $filesrc_rel_datadir );

	$_SESSION['upload_message'] = "Filen har laddats upp";
	echo 'Filen har laddats upp.';
	echo '<form action="index.php"><input type="submit" value="tillbaka" /></form>';
} 
catch (RuntimeException $e) {
	echo $e->getMessage();
	echo '<form action="index.php"><input type="submit" value="tillbaka" /></form>';
    $_SESSION['upload_message'] = "Filen kunde inte laddas upp.";
}

function addImage(  $filepath, 
                    $imagesrc ) {

    if (file_exists($filepath)) {
		$data_array = array();
		$image = array();
		$image['src']       = $imagesrc;
		array_push($data_array, $image);
		$jsondata = json_encode($data_array);
		$write_success = file_put_contents($filepath, $jsondata);
		if (!$write_success) {
			throw new RuntimeException('Kunde inte skriva till fil: ' . $filepath);
		}
    }
    else {
        throw new RuntimeException('Kunde inte läsa från filen: ' . $filepath);
    }
}

?>
