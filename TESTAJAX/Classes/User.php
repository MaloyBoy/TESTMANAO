<?php

namespace TESTAJAX\Classes;

header('Content-type: application/json');

class User
{
    private array $data;
    private string $login = "";
    private string $maillog = "";
    private string $salt = "1b34r7q5";
    private bool $result = false;
    private string $namesession = "";

    /**
     * Соединение с файлом
     * @return void
     */
    public function Connect()
    {
        $data = file_get_contents(__DIR__ . '/../Register/user.json');

        $this->data = json_decode($data, true);
    }

    /**
     * Запись в файл
     * @return void
     */
    public function Write()
    {
        $data = json_encode($this->data, JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT);
        file_put_contents(__DIR__ . '/../Register/user.json', $data);
    }

    /**
     * Обновление данных юзера
     * @return void
     */
    public function Update($DataUser)
    {
        $infono = array("Info" => "No");
        session_start();
        $this->Connect();
        foreach ($this->data as $key => $value) {
            if ($_SESSION['login'] == $value['login']) {
                $updatearr = array(
                    'login' => $value['login'],
                    'email' => $value['email'],
                    'password' => md5($this->salt . $DataUser['password']),
                    'name' => $DataUser['name']);
                $_SESSION['name'] = $DataUser['name'];
                $this->data[$key] = $updatearr;
                $this->Write();
                $infoyes = array("Info" => "Yes");
                echo json_encode($infoyes);
                $this->result = true;
                break;
            }
        }
        if ($this->result === false) {
            echo json_encode($infono);
        }
    }

    /**
     * Удаление юзера
     * @return void
     */
    public function Delete()
    {
        $delete = array("Info" => "DeleteYes");
        session_start();
        $this->Connect();
        foreach ($this->data as $key => $value) {
            if ($_SESSION['login'] === $value['login']) {
                unset($this->data[$key]);
                $this->Write();
                echo json_encode($delete);
                session_unset();
                break;
            }
        }
    }

    /**
     * Проверка логина на существующий
     * @return void
     */
    public function ValidLog(array $DataUser)
    {
        $this->Connect();
        foreach ($this->data as $value) {
            if ($value['login'] == $DataUser['login']) {
                $this->login = 1;
                break;
            } else {
                $this->login = 0;
            }
        }
    }

    /**
     * Проверка на существующий mail
     * @return void
     */
    public function EmailLog(array $DataUser)
    {
        $this->Connect();
        foreach ($this->data as $value) {
            if ($value['email'] == $DataUser['email']) {
                $this->maillog = 1;
                break;
            } else {
                $this->maillog = 0;
            }
        }
    }

    /**
     * Создание нового юзера
     * @return void
     */
    public function CRUD_ADD(array $DataUser)
    {
        $this->ValidLog($DataUser);
        $this->EmailLog($DataUser);

        if ($this->login == 1) {
            $info = array('Info' => 'Этот логин уже занят');
            echo json_encode($info);
        } elseif ($this->maillog == 1) {
            $info['Info'] = 'Этот адрес уже занят';
            echo json_encode($info);
        } else {
            $this->Connect();
            $add_arr = array(
                "login" => $DataUser['login'],
                "password" => md5($this->salt . trim($DataUser['password'])),
                "email" => $DataUser['email'],
                "name" => $DataUser['name']
            );
            $this->data[] = $add_arr;
            $this->Write();
            $info['Info'] = 'Вы успешно зарегистрировались!';
            echo json_encode($info);
        }
    }

    /**
     * Проверка логина и пароля юзера
     * @return void
     */
    public function pasLog(array $DataUser)
    {
        $this->Connect();
        $this->result = false;
        foreach ($this->data as $data) {
            if ($data['login'] === $DataUser['login']) {
                if ($data['password'] === md5($this->salt . $DataUser['password'])) {
                    $this->namesession = $data['name'];
                    $this->result = true;
                    break;
                }
            }
        }
    }

    /**
     * Авторизация пользователя
     * @return void
     */
    public function login(array $DataUser)
    {

        $this->pasLog($DataUser);
        if (false != $this->result) {
            session_start();
            setcookie("visit", $DataUser['login'], strtotime("+30 days"));
            $_SESSION['login'] = $DataUser['login'];
            $_SESSION['name'] = $this->namesession;
            $errpass = array("Info" => 'Да');
            echo json_encode($errpass);

        } else {
            $errpass = array("Info" => 'Нет');
            echo json_encode($errpass);
        }
    }
}
?>