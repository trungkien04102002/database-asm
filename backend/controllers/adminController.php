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
            header("Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS, DELETE");         

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

        if ($method != "GET") {
            if (!isset(apache_request_headers()["Authorization"]) || ! preg_match('/Bearer\s(\S+)/', apache_request_headers()["Authorization"], $matches)) {
                throw new Exception("Cannot find token!",400);
            }
            $user = authenticateAdmin($matches[1]);
        }
        if (!isset($path[3])){
            throw new Exception("Cannot find route!",400);
        }
        switch ($method){
            case "GET":
                if ($path[3] == "count"){
                    if(!isset($_GET["minPayment"])){
                        throw new Exception("Lack information",400);
                    }
                    echo json_encode(OtherModel::getCountRes($_GET["minPayment"]));
                    break;
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
                        echo json_encode(UserModel::getAllCus($keySearch,$orderField));
                        break;
                    case "restaurants":
                        echo json_encode(OtherModel::getAllRes($keySearch,$orderField));
                        break;
                    case "dishes":
                        if (!isset($_GET["resID"])){
                            throw new Exception("Lack information",400);
                        }
                        echo json_encode(OtherModel::getAllDishesFromARes($_GET["resID"],$keySearch,$orderField));
                        break;
                }
                break;
            case "POST": 
                switch ($path[3]){
                    case "dish":
                        if (!isset($_POST["dishName"]) || !isset($_POST["isAvailable"]) || !isset($_POST["dishDescription"])
                            || !isset($_POST["unitPrice"]) || !isset($_POST["resID"]) || !isset($_POST["size"]) )
                        {
                            throw new Exception("Lack information",400);
                        }
                        $dishName = $_POST["dishName"];
                        $dishDescription = $_POST["dishDescription"];
                        $isAvailable = $_POST["isAvailable"];
                        $size = $_POST["size"];
                        $unitPrice = $_POST["unitPrice"];
                        $resID = $_POST["resID"];
                        if ($dishName=="" || $dishDescription=="" || $isAvailable==""
                            || $size == "" || $unitPrice=="" || $resID==""){
                            throw new Exception("Lack information",400);
                        }
                        echo json_encode(OtherModel::insertDish($dishName,$resID,$size,$isAvailable,$dishDescription,$unitPrice));
                        break;                       
                }
                break;
            case "PATCH":
                parse_str(file_get_contents('php://input'),$data);

                switch ($path[3]){
                    case "customer":
                        if (!isset($data["userID"])){
                            throw new Exception("Lack information",400);
                        }
                        $cus = UserModel::getCustomerByID($data["userID"]);
                        $sex = (isset($data["sex"]))? $data["sex"]:$cus["sex"];
                        $birthday = (isset($data["birthday"]))? $data["birthday"]:$cus["birthday"];
                        $phoneNumber = (isset($data["phoneNumber"]))? $data["phoneNumber"]:$cus["phoneNumber"];
                        $name = (isset($data["name"]))? $data["name"]:$cus["name"];
                        $email = (isset($data["email"]))? $data["email"]:$cus["email"];
                        $password = $cus["password"];
                        echo json_encode(UserModel::updateCustomer($data["userID"], $email, $name,$sex,$birthday,$password,$phoneNumber));
                        break;
                    case "dish":
                        if (!isset($data["dishID"])){
                            throw new Exception("Lack information",400);
                        }
                        $dish =  OtherModel::getDishByID($data["dishID"]);

                        $dishName = (isset($data["dishName"]))? $data["dishName"]:$dish["dishName"];
                        $dishDescription = (isset($data["dishDescription"]))? $data["dishDescription"]:$dish["dishDescription"];
                        $isAvailable = (isset($data["isAvailable"]))? $data["isAvailable"]:$dish["isAvailable"];
                        $size = (isset($data["size"]))? $data["size"]:$dish["size"];
                        $unitPrice = (isset($data["unitPrice"]))? $data["unitPrice"]:$dish["unitPrice"];

                        echo json_encode(OtherModel::updateDish($data["dishID"],$dishName,$size,$isAvailable,$dishDescription,$unitPrice));
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
                    case "dish":
                        if (!isset($_GET["dishID"])){
                            throw new Exception("Lack information",400);
                        }
                        echo json_encode(OtherModel::deleteDish($_GET["dishID"]));
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
