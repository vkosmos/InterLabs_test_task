<?php

namespace App\Controllers\Adminsection;

use App\ControllerAdmin;
use App\Models\User;

class Delete extends ControllerAdmin
{

    protected function handle()
    {
        $id = (int)trim($_GET['id']);
        $user = User::findById($id);
        if ($user) {
            $user->delete();
            $message = 'Пользователь успешно удален';
            http_response_code(400);
        } else {
            $message = 'Ошибка. Пользователь не найден';
            http_response_code(404);
        }

        $out = [
            'message' => $message,
        ];
        header('Content-Type: text/json; charset=utf-8');
        echo json_encode($out);
    }
}
