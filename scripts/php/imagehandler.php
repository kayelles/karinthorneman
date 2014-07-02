<?php
    
    if(isset($_POST['action']) && !empty($_POST['action'])) {
        $action = $_POST['action'];
        switch($action) {
            case 'resizeImage':
                resizeImage();
                break;
            case 'test':
                test();
                break;
            default:
                echo 'unknown action' . "\n";
                break;
        }
    }

    function resizeImage() {
        $writepath = '../../images/b3_small.jpg';
        $readpath = '../../images/b3.jpg';
        $imgtool = new Imagick();
        if (file_exists($readpath)) {
            if (is_writeable($readpath)) {
                $imgtool->readImage($readpath);
                $imgtool->resizeImage(320, 240, Imagick::FILTER_LANCZOS, 1);
                $imgtool->writeImage($readpath);
                $imgtool->clear();
                $imgtool->destroy();
                echo 'attempt to resize image successful' . "\n";
            }
            else {
                throw new Exception('Cannot write to file');
            }
        }
        else {
            throw new Exception('Cannot read from file');
        }
    }

    function test() {
        if (file_exists($readpath)) {
            echo 'file exists!';
        }
        else {
            echo 'file does not exists';
        }
    }
?>
