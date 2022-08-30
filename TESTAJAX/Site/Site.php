<?php
use TESTAJAX\Classes\User;
require_once ('../Config.php');
header('Content-type: application/json');
if (@$_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
    session_start();

    if ($_POST['Hello'] == 'Hello') {
        $hello = "Привет ";
        $info = array("Info" => $hello . $_SESSION['name']);
        echo json_encode($info);
    }
    if ($_POST['info'] == 'UpdateYes') {
        $info["Info"] = 'UpdateYes';
        echo json_encode($info);
    } else if ($_POST['info'] == 'DeleteYes') {
        $user = new User;
        $user->Delete();
    } else if ($_POST['info'] == 'ExitYes') {
        $info["Info"] = 'ExitYes';
        echo json_encode($info);
        session_unset();
    }
} else {
    $info["Info"] = "Это не АЖАкс запрос";
    echo $info;
}
?>