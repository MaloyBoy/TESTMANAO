const form = document.getElementById('form');
const login = document.getElementById('login');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
const email = document.getElementById('email');
const name = document.getElementById('name');
document.getElementById('signupbtn').disabled = false;

$("input#password1").on({
    keydown: function(e) {
        if (e.which === 32)
            return false;
    },
    change: function() {
        this.value = this.value.replace(/\s/g, "");
    }
});

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error'
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function regLog(login) {
    return /^[A-Za-z0-9]{6,16}$/.test(login);
}

function regPas(password1) {
    return /^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,32}$/.test(password1);
}

function regEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function regName(name) {
    return /^[А-Яа-яЁё]{2,16}$/.test(name);
}

/**
 * валидация и отправка данных на сервер
 */

$('button.signupbtn').click(function (e) {
    e.preventDefault();
    const loginValue = login.value;
    const passwordValue = password1.value;
    const password2Value = password2.value;
    const emailValue = email.value;
    const nameValue = name.value;
    if (loginValue === '') {
        setErrorFor(login, 'Введите логин');
    } else if (!regLog(loginValue)) {
        setErrorFor(login, 'Введите корректно логин');
    } else if (passwordValue === '') {
        setSuccessFor(login);
        setErrorFor(password1, 'Введите пароль');
    } else if (!regPas(passwordValue)) {
        setSuccessFor(login);
        setErrorFor(password1, 'Введите корректно пароль');
    } else if (password2Value === '') {
        setSuccessFor(password1);
        setErrorFor(password2, 'Введите пароль повторно');
    } else if (emailValue === '') {
        setSuccessFor(password2);
        setErrorFor(email, 'Введите email');
    } else if (!regEmail(emailValue)) {
        setErrorFor(email, 'Введите email корректно');
    } else if (nameValue === '') {
        setSuccessFor(email);
        setErrorFor(name, 'Введите имя');
    } else if (!regName(nameValue)) {
        setSuccessFor(email);
        setErrorFor(name, 'Введите имя корректно');
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Повторный пароль введён неверно');
        setErrorFor(password1, 'Введите пароль');
    } else {
        setSuccessFor(login);
        setSuccessFor(password1);
        setSuccessFor(password2);
        setSuccessFor(email);
        setSuccessFor(name);
        $.ajax({
            method: "POST",
            url: "/Register/Register.php",
            dataType: 'json',
            data: {
                login: loginValue,
                password: passwordValue,
                password2: password2Value,
                email: emailValue,
                name: nameValue
            }
        })
            .done(function (msg) {
                logInfo = "Этот логин уже занят";
                emailInfo = "Этот адрес уже занят";
                reg = "Вы успешно зарегистрировались!";
                if (msg["Info"] === logInfo) {
                    setErrorFor(login, logInfo);
                } else if (msg["Info"] === emailInfo) {
                    setSuccessFor(login);
                    setErrorFor(email, emailInfo)
                } else {
                    $('input.login').val('');
                    $('input.password1').val('');
                    $('input.password2').val('');
                    $('input.email').val('');
                    $('input.name').val('');
                    alert(reg);
                }
            })
    }
});
