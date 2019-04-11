<?php

spl_autoload_register(function ($class){
    $file = str_replace('\\', '/', $class) . '.php';
    $file = __DIR__ . '/../' .$file;
    if (file_exists($file)){
        include $file;
    }
} );
