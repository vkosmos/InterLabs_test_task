<?php

namespace App\Controllers;

use App\Controller;
use App\Models\Admin;

class AdminLogin extends Controller
{

    protected function handle()
    {
        if (!empty($_POST)){
            $result = false;
            $login = !empty(trim($_POST['login'])) ? trim($_POST['login']) : null;
            $password = !empty(trim($_POST['password'])) ? trim($_POST['password']) : null;

            if ($login && $password) {
                $admin = Admin::findByLogin($login);
                if ($admin){
                    if ($admin->login($password)){
                        $result = true;
                        $_SESSION['admin']['login'] = $admin->login;
                    }
                }
            }

            if (!$result){
                $_SESSION['error'] = 'Неверная пара Логин / Пароль';
            }

            header('Location: ' . '/');
        }
    }
}
