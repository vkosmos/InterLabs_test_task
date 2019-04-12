<?php

namespace App\Models;

use App\Db;
use App\Model;

class User extends Model
{
    protected const TABLE = 'users';
    public $name;
    public $email;
    public $address;
    public $sort;

    public static function findAll()
    {
        $db = new Db();
        $sql = 'SELECT * FROM ' . static::TABLE . ' ORDER BY sort';
        return $db->query($sql, [], static::class);
    }

    public static function getMaxSort()
    {
        $db = new Db();
        $sql = 'SELECT max(sort) as sort FROM ' . static::TABLE;
        $temp = $db->query($sql, []);
        return $temp[0]['sort'];
    }

    public static function saveSort($data)
    {
        $db = new Db();
        $sql = 'UPDATE ' . static::TABLE . ' SET sort = CASE id';
        $when = '';
        $in = '';
        $binds = [];

        foreach ($data as $v) {
            $when .= ' WHEN ' . ':id'.$v[0] . ' THEN ' . ':s'.$v[1];
            $binds[':id'.$v[0]] = $v[0];
            $binds[':s'.$v[1]] = $v[1];
            $in .= ':id'.$v[0] . ',';
        }

        $in = substr($in, 0 , -1);
        $sql .= $when;
        $sql .= ' END WHERE id IN (';
        $sql .= $in;
        $sql .= ')';

        $db->query($sql, $binds);

//            UPDATE users
//              SET sort = CASE id
//                WHEN 1 THEN 15
//                WHEN 3 THEN 20
//                WHEN 50 THEN 25
//              END
//            WHERE id IN (1, 3, 50)
    }
}
