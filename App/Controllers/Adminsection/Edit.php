<?php

namespace App\Controllers\Adminsection;

use App\ControllerAdmin;
use App\Models\User;

class Edit extends ControllerAdmin
{

    protected function handle()
    {
        $id = (int)trim($_GET['id']);
        $user = User::findById($id);
        if ($user) {
            $message = 'Данные успешно получены';
        } else {
            $message = 'Ошибка получения данных';
        }

        $out = [
            'message' => $message,
            'user-data' => $user,
        ];
        header('Content-Type: text/json; charset=utf-8');
        echo json_encode($out);
    }
}
