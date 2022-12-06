<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
    header('Content-Type: application/json; charset=utf-8');

    $path = explode('/', parse_url($_SERVER["REQUEST_URI"])["path"]);

    require_once("../models/otherModel.php");
    require_once("../models/userModel.php");

    require_once "../middlewares/auth.php";

    $method = $_SERVER["REQUEST_METHOD"];
    try{
        if (!isset(apache_request_headers()["Authorization"]) || ! preg_match('/Bearer\s(\S+)/', apache_request_headers()["Authorization"], $matches)) {
            throw new Exception("Cannot find token!",400);
        }
        $user = authenticateAdmin($matches[1]);
        if (!isset($path[3])){
            throw new Exception("Cannot find route!",400);
        }
        switch ($method){
            case "GET":
                if(isset($_GET["page"])){
                    $page = $_GET["page"];
                } else {
                    $page = 1;
                }
                if(isset($_GET["keySearch"])){
                    $keySearch = $_GET["keySearch"];
                } else {
                    $keySearch = "";
                }
                if(isset($_GET["orderField"])){
                    $orderField = $_GET["orderField"];
                } else {
                    $orderField = 1;
                }
                switch ($path[3]){
                    case "customers":
                        echo json_encode(UserModel::getAllCus($page,$keySearch,$orderField));
                        break;
                    case "restaurants":
                        echo json_encode(OtherModel::getAllRes($page,$keySearch,$orderField));
                        break;
                    case "orders":
                        break;
                }
                break;
            case "POST": 
                break;
            case "PATCH":
                parse_str(file_get_contents('php://input'),$data);
                if (!isset($data["userID"])){
                    throw new Exception("Lack information",400);
                }
                switch ($path[3]){
                    case "customer":
                        $cus = UserModel::getCustomerByID($data["userID"]);
                        $sex = (isset($data["sex"]))? $data["sex"]:$cus["sex"];
                        $birthday = (isset($data["birthday"]))? $data["birthday"]:$cus["birthday"];
                        $phoneNumber = (isset($data["phoneNumber"]))? $data["phoneNumber"]:$cus["phoneNumber"];
                        $name = (isset($data["name"]))? $data["name"]:$cus["name"];
                        $email = (isset($data["email"]))? $data["email"]:$cus["email"];
                        $password = $cus["password"];
                        echo json_encode(UserModel::updateCustomer($data["userID"], $email, $name,$sex,$birthday,$password,$phoneNumber));
                        break;
                    case "orderstate":
                        break;
                }
                break;
            case "DELETE":
                switch ($path[3]){
                    case "customer":
                        if (!isset($_GET["userID"])){
                            throw new Exception("Lack information",400);
                        }
                        echo json_encode(UserModel::deleteCustomer($_GET["userID"]));
                        break;

                }
                break;    
        }
    }
    catch(Exception $e){
        http_response_code($e->getCode());
        echo json_encode(Array("msg"=>$e->getMessage()));

    }

?>
