<?php

namespace App\Controllers\Adminsection;

use App\ControllerAdmin;
use App\Models\User;

class Index extends ControllerAdmin
{

    protected function handle()
    {
        $this->view->users = User::findAll();
        $this->view->display(TEMPLATES . '/adminsection/index.php');
    }
}
