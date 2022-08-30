<?php
use TESTAJAX\Classes\User;
require_once ('../Config.php');
if (@$_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
    $user = new User;
    $user->login($_POST);
} else {
    echo "Это не АЖАкс запрос";
}
?>