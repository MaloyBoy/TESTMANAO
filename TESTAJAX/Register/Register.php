<?php
use TESTAJAX\Classes\User;
require_once ('../Config.php');
if (@$_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
    include_once '../Classes/User.php';
    $user = new User;
    $user->CRUD_ADD($_POST);
} else {
    echo "Это не АЖАкс запрос";
}
?>