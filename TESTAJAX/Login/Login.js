const form = document.getElementById('form');
const login = document.getElementById('login');
const password = document.getElementById('password');
document.getElementById('enter').disabled = false;

/**
 * Отрицательный input
 * @param input
 * @param message
 */
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error'
}

/**
 * Положительный input
 * @param input
 */
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

/**
 * Валидация и отправка
 */
$('button.enter').click(function (e) {
    e.preventDefault();
    const loginValue = login.value.trim();
    const passwordValue = password.value.trim();
    if (passwordValue === '' && loginValue === '') {
        setErrorFor(login, 'Не верно введён логин или пароль');
        setErrorFor(password, 'Не верно введён логин или пароль');
    } else if (loginValue === '') {
        setErrorFor(login, 'Не верно введён логин или пароль');
    } else if (passwordValue === '') {
        setErrorFor(password, 'Не верно введён логин или пароль');
    } else {
        setSuccessFor(login);
        setSuccessFor(password);
        $.ajax({
            method: "POST",
            url: "/Login/Login.php",
            dataType: 'json',
            data: {
                login: loginValue,
                password: passwordValue,
            }
        })
            .done(function (msg) {
                if (msg["Info"] === "Да") {
                    document.location.href = "Site.html";
                } else {
                    setErrorFor(login, 'Не верно введён логин или пароль');
                    setErrorFor(password, 'Не верно введён логин или пароль');
                    $('input.login').val('');
                    $('input.password').val('');
                }
            })
    }
})
