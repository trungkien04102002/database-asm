<?php
    require_once __DIR__ . '/../vendor/autoload.php';
    require_once "../middlewares/auth.php";
    require_once("../models/userModel.php");

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header('Content-Type: application/json; charset=utf-8');

    use Firebase\JWT\JWT;
    $path = explode('/', parse_url($_SERVER["REQUEST_URI"])["path"]);

    $method = $_SERVER["REQUEST_METHOD"];
    try{
        switch ($method){
            case "GET":
                if (!isset(apache_request_headers()["Authorization"]) || ! preg_match('/Bearer\s(\S+)/', apache_request_headers()["Authorization"], $matches)) {
                    throw new Exception("Cannot find token!",400);
                }
                $user = authenticate($matches[1]);
                if (!isset($path[3])){
                    throw new Exception("Cannot find route!",400);
                }
                switch ($path[3]){
                    case "profile":
                        echo json_encode(UserModel::getUserProfile($user["userName"],$user["role"]));
                        break;

                }

                
                break;
            case "POST": 

                if (!isset($path[3])){
                    throw new Exception("Cannot find route!",400);
                }
                switch ($path[3]){
                    case "signup":
                        if (UserModel::checkUserExistence($_POST["userName"],$_POST["email"])){
                            throw new Exception("User has already existed!", 400);
                        }
                        else {
                            if (!isset($_POST["email"]) || !isset($_POST["name"]) || !isset($_POST["sex"])  || !isset($_POST["birthday"])
                                || !isset($_POST["phoneNumber"]) || !isset($_POST["password"])|| !isset($_POST["userName"])){
                                throw new Exception("Lack information to create new account", 400);
                            }
                            $email = $_POST["email"];
                            $email = $_POST["userName"];
                            $name = $_POST["name"];
                            $sex = $_POST["sex"];
                            $birthday = $_POST["birthday"];
                            $phoneNumber = $_POST["phoneNumber"];
                            $hashPassword =  password_hash($_POST["password"],PASSWORD_DEFAULT);
                            echo json_encode(UserModel::createNewCus($email, $userName, $name, $sex, $phoneNumber, $hashPassword, $birthday));
                        };
                        break;
                    case "login":
                        $userName = $_POST["userName"];
                        $password = $_POST["password"];
                        $role = $_POST["role"];

                        if (!UserModel::checkUserExistence($userName)){
                            throw new Exception("User has not signed up yet!", 400);
                        }
                        if (!UserModel::comparePassword($userName,$password,$role)){
                            throw new Exception("Your password is incorrect!", 400);
                        }
                        $key = "datkienhoangphu";
                        $user = UserModel::getUserProfile($userName,$role);
                        $date   = new DateTimeImmutable();
                        $expire_at = $date->modify('+5 days')->getTimestamp(); 
                        $payload = Array("userID"=>$user["userID"], "userName"=>$user["userName"],"role"=>$user["role"],"exp"=>$expire_at);
                        $jwt = JWT::encode($payload, $key, 'HS256');
                        $user["token"] = $jwt;
                        echo json_encode($user);
                        break;

                }
                break;
            case "PATCH":
                parse_str(file_get_contents('php://input'),$data);
                if (!isset(apache_request_headers()["Authorization"]) || ! preg_match('/Bearer\s(\S+)/', apache_request_headers()["Authorization"], $matches)) {
                    throw new Exception("Cannot find token!",400);
                }
                $user = authenticate($matches[1]);

                if (!isset($path[3])){
                    throw new Exception("Cannot find route!",400);
                }

                $email = $user["email"];              

                switch ($path[3]){
                    case "edit":
                        if (!isset($data["phoneNumber"]) || !isset($data["fullName"]) || !isset($data["sex"])){
                            throw new Exception("Lack information", 400);                           
                        }
                        $phoneNumber = $data["phoneNumber"];
                        $fullName = $data["fullName"];
                        $sex = $data["sex"];
                        echo json_encode(UserModel::editProfile($email,$fullName,$phoneNumber,$sex));
                        break;
                    case "editpassword":

                        if (!isset($data["password"])){
                            throw new Exception("Lack information", 400);                           
                        }
                        $hashPassword =  password_hash($data["password"],PASSWORD_DEFAULT);
                        echo json_encode(UserModel::updatePassword($user["userID"],$hashPassword));
                        break;
                    }
                break;
            case "DELETE":
                break;

        }
    }
    catch(Exception $e){
        http_response_code($e->getCode());
        echo json_encode(Array("msg"=>$e->getMessage()));
    }

?>
