<?php

namespace App;

abstract class ControllerAdmin extends Controller
{
    protected function access()
    {
        if (isset($_SESSION['admin'])){
            return true;
        } else {
            header('Location: /');
        };
    }
}
