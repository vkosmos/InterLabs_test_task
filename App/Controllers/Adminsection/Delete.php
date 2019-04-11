<?php

namespace App\Controllers\Adminsection;

use App\ControllerAdmin;
use App\Models\User;

class Delete extends ControllerAdmin
{

    protected function handle()
    {
        $ids = $_POST['ids'];
        $flagError = false;

        foreach ($ids as $id) {
            $user = User::findById($id);
            if ($user) {
                $user->delete();
            } else {
                $flagError = true;
            }
        }

        if (!$flagError) {
            $message = 'Пользователь успешно удален';
            http_response_code(200);
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
