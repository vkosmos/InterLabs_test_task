<?php

namespace App\Controllers\Adminsection;

use App\ControllerAdmin;
use App\Models\User;

class Edit extends ControllerAdmin
{

    protected function handle()
    {
        $id = trim($_POST['id']);
        $name = trim($_POST['name']);
        $email = trim($_POST['email']);
        $address = trim($_POST['address']);
        $sort = trim($_POST['sort']);

        if (!empty($id) &&!empty($name) && !empty($email) && !empty($address) && !empty($sort)) {
            $user = new User();
            $user->id = $id;
            $user->name = $name;
            $user->email = $email;
            $user->address = $address;
            $user->sort = $sort;
            $user->save();
            http_response_code(200);
            $message = 'Пользователь изменен';
        } else {
            $user = false;
            http_response_code(400);
            $message = 'Переданы неверные данные';
        }
        $out = [
            'message' => $message,
            'user_data' => $user,
        ];
        header('Content-Type: text/json; charset=utf-8');
        echo json_encode($out);
    }
}
