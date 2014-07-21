<?php

    $target_path = "uploads/"; 
    if (file_exists($target_path)) {
        $target_path = $target_path . basename( $_FILES['uploadedfile']['name']) ; 
        if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) {
        
        echo "<p>The file ". basename( $_FILES['uploadedfile']['name']) . 
                " has been uploaded</p>";
        } 
        else {
            echo "<p>Sorry, there was a problem uploading your file.</p>";
        }
    }
    else {
        echo "<p>Can't find destination folder</p>";
    }

    echo '<p>here goes some debugging information:</p> ' ;
    echo(print_r($_FILES));

?>
