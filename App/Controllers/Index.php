<?php

namespace App\Controllers;

use App\Controller;

class Index extends Controller
{
    function handle()
    {
        if (isset($_SESSION['admin'])){  //Переадресация в Административный раздел
            header('Location: /adminsection');
        } else {  //Отображаем форму входа
            $this->view->display(TEMPLATES . '/index.php');
        }
    }
}
