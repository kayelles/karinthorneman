<?php
    
    echo 'Welcome</br></br>';

    echo '<form action="imagehandler.php" method="post">' . 
           '<input type="submit" name="addImage" ' .
           'value="Add pictures" /></br>' . 
           '<input type="hidden" name="action" ' .
           'value="add" /></br>' . 
           '</form>';
    echo '<form action="imagehandler.php" method="post">' . 
           '<input type="submit" name="removeImage"' .
           'value="Remove pictures" /></br>' . 
           '<input type="hidden" name="action" ' .
           'value="remove" /></br>' . 
           '</form>';
    echo '<form action="main.php" method="post">' . 
           '<input type="submit" name="resizeImage"' .
           'value="rezise pics" /></br>' . 
           '<input type="hidden" name="action" ' .
           'value="resize" /></br>' . 
           '</form>';

?>
