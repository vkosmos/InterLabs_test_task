<?php
/**
 * @var \App\View $this
 */
?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">

    <link rel="stylesheet" href="/templates/css/style.css">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Список пользователей.</title>
</head>
<body>
<h1>Админка. Список пользователей.</h1>

<p><a class="button" href="/adminlogout">Выйти из админки</a></p>

<p><a class="button users-add__show">Добавить пользователя</a></p>

<form class="users-add">
    <p>
        <label for="user-name-add">Имя:<br>
        <input id="user-name-add" type="text" class="users-add__item" name="name" placeholder="Имя">
        </label>
    </p>
    <p>
        <label for="user-email-add">E-mail:<br>
            <input id="user-email-add" type="text" class="users-add__item" name="email" placeholder="Email">
        </label>
    </p>
    <p>
        <label for="user-address-add">Адрес:<br>
            <input id="user-address-add" type="text" class="users-add__item" name="address" placeholder="Адрес">
        </label>
    </p>
    <button class="users-add__button button" type="submit">Добавить</button>
    <a class="users__hide users__hide--add"></a>
</form>

<p class="users-list__error"></p>

<ul class="users-list droppable">
    <?php foreach($this->users as $item): ?>
        <li class="users-list__item draggable" data-id="<?=$item->id;?>">
            <div class="users-list__checkbox-wrapper">
                <input class="users-list__checkbox" type="checkbox" data-id="<?=$item->id;?>">
            </div>
            <div class="users-list__wrapper">
                <p class="users-list__text">
                    <b>Имя:</b> <span class="users-list__text--name"><?=$item->name;?></span>
                </p>
                <p class="users-list__text">
                    <b>E-mail:</b> <span class="users-list__text--email"><?=$item->email;?></span>
                </p>
                <p class="users-list__text">
                    <b>Адрес:</b> <span class="users-list__text--address"><?=$item->address;?></span>
                </p>
            </div>
            <p class="users-list__links">
                <a class="button users-list__edit" data-id="<?=$item->id;?>" data-sort="<?=$item->sort;?>" href="/adminsection/edit/?id=<?=$item->id?>">Редактировать</a>
            </p>
        </li>
    <?php endforeach; ?>
</ul>
<a class="button users-list__delete" href="">Удалить выбранные</a>

<div class="modal__edit">
    <form class="users-edit" method="POST">
        <input class="users-edit__item" name="sort" type="hidden" value="">
        <p>
            <label for="user-name--edit">Имя:<br>
                <input id="user-name--edit" type="text" class="users-edit__item" name="name" placeholder="Имя">
            </label>
        </p>
        <p>
            <label for="user-email--edit">E-mail:<br>
                <input id="user-email--edit" type="text" class="users-edit__item" name="email" placeholder="Email">
            </label>
        </p>
        <p>
            <label for="user-address--edit">Адрес:<br>
                <input id="user-address--edit" type="text" class="users-edit__item" name="address" placeholder="Адрес">
            </label>
        </p>
        <button class="users-edit__button button" type="submit">Изменить</button>
        <a class="users__hide users__hide--edit"></a>
    </form>
</div>
<div class="overlay"></div>

<script src="/templates/js/jquery-3.2.0.min.js"></script>
<script src="/templates/js/dragndrop.js"></script>
<script src="/templates/js/script.js"></script>

</body>
</html>
