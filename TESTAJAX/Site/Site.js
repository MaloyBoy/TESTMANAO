document.getElementById('Update').disabled = false;
document.getElementById('Delete').disabled = false;
document.getElementById('Exit').disabled = false;
document.addEventListener("DOMContentLoaded", ready);
const form = document.getElementById('form');
var Hello = 'Hello';

function ready() {
    $.ajax({
        method: "POST",
        url: "/Site/Site.php",
        dataType: 'json',
        data: {
            Hello,
        }
    }).done(function (msg) {
        var a = msg["Info"];
        document.getElementById("Hello").innerHTML = a;
    })
}

var info;

$('button.Delete').click(function (e) {
    e.preventDefault();
    info = 'DeleteYes';
})
$('button.Exit').click(function (e) {
    e.preventDefault();
    info = 'ExitYes';
})
$('button.Update').click(function (e) {
    e.preventDefault();
    info = 'UpdateYes';
})
$('button').click(function () {
    $.ajax({
        method: "POST",
        url: "/Site/Site.php",
        dataType: 'json',
        data: {
            info,
        }
    })
        .done(function (msg) {
            if (msg["Info"] === "UpdateYes") {
                document.location.href = '/Site/Update/Update.html';
            } else if (msg["Info"] === "ExitYes") {
                document.location.href = 'Autorise.html';
            } else if (msg["Info"] === "DeleteYes") {
                document.location.href = 'Autorise.html';
            } else if (msg["Info"] === "DeleteNo") {
                alert("ОШИБКА!");
            }
        })
})