<?php
/**
 * @var \App\View $this
 */
?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">

    <link rel="stylesheet" type="text/css" href="/templates/css/style.css">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Главная страница сайта</title>
</head>
<body>
    <h1>Главная страница сайта</h1>

    <section class="main-content">

        <form class="login-form" action="/adminLogin" method="post">
            <h3>Вход в административный раздел</h3>
            <p>
                <label>Логин:
                <input class="login-form__input" name="login" type="text" placeholder="admin">
                </label>
            </p>
            <p>
                <label>Пароль:
                <input class="login-form__input" name="password" type="text" placeholder="123456">
                </label>
            </p>
            <p>
                <button class="button login-form__button" type="submit">Войти</button>
            </p>

        </form>

        <?php
            if (isset($_SESSION['error'])){
                echo '<p>' . $_SESSION['error'] . '</p>';
                unset($_SESSION['error']);
            }
        ?>

    </section>

</body>
</html>
