<?php

namespace App\Models;

use App\Model;

class User extends Model
{
    protected const TABLE = 'users';
    public $name;
    public $email;
    public $address;
}
