<?php

namespace App\Controllers\Adminsection;

use App\ControllerAdmin;
use App\Models\User;

class Savesort extends ControllerAdmin
{

    protected function handle()
    {
        $accordance = $_POST['data'];
        User::saveSort($accordance);

        http_response_code(200);
        $message = 'Порядок сортировки изменен';

        $out = [
            'message' => $message,
        ];
        header('Content-Type: text/json; charset=utf-8');
        echo json_encode($out);
    }
}
