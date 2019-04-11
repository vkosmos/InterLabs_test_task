<?php

use App\Router;

require __DIR__ . '/config/lib.php';
require __DIR__ . '/App/autoload.php';

session_start();

$controllerName = Router::processRoute(parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH));

if (class_exists($controllerName, true)) {
    $controller = new $controllerName;
    $controller();
}
