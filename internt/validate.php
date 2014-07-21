<?php
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    if ($username == "karin" and $password == "123") {
        header('Location: main.php');
    }
    else {
        echo 'Password or username is incorrect';
    }

?>
