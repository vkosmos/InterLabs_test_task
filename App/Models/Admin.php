<?php

namespace App\Models;

use App\Db;
use App\Model;

/**
 * Class Admin
 * @package App\Models
 */
class Admin extends Model
{
    protected const TABLE = 'admins';
    public $login;
    public $password;

    public function login($password)
    {
        if (password_verify($password, $this->password)){
            return true;
        }
        return false;
    }

    public static function findByLogin($login)
    {
        $db = new Db();
        $sql = 'SELECT * FROM ' . static::TABLE . ' WHERE login = :login';
        $params = [':login' => $login];
        $data = $db->query($sql, $params, static::class);
        return (!empty($data) && is_array($data)) ? $data[0] : false;
    }
}
