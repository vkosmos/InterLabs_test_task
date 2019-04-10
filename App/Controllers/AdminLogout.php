<?php

namespace App\Controllers;

use App\Controller;

class AdminLogout extends Controller
{
    protected function handle()
    {
        if (isset($_SESSION['admin'])){
            unset($_SESSION['admin']);
        }
        header('Location: /');
    }
}
