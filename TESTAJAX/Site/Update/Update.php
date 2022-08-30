<?php
use TESTAJAX\Classes\User;
require_once ('../../Config.php');
header('Content-type: application/json');
if (@$_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
    if ($_POST["Exit"] === "Exit") {
        $Exit = array("Info" => "Yes");
        echo json_encode($Exit);
    } else {
        $user = new User;
        $user->Update($_POST);
    }
} else {
    $Exit["Info"] = "Это не АЖАкс запрос";
    echo $Exit;
}

?>