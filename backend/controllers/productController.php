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

    require_once("../models/productModel.php");
    $method = $_SERVER["REQUEST_METHOD"];
    try{
        switch ($method){
           
            case "GET":
                switch($path[3]){
                    case "pets":
                        if(isset($_GET["page"])){
                            $page = $_GET["page"];
                        } else {
                            $page = 1;
                        }
                        break;
                    case "products":
                        if(isset($_GET["page"])){
                            $page = $_GET["page"];
                        } else {
                            $page = 1;
                        }
                        break;
                    case "foods":
                        if(isset($_GET["page"])){
                            $page = $_GET["page"];
                        } else {
                            $page = 1;
                        }
                        break;  
                    case "services":
                        if(isset($_GET["page"])){
                            $page = $_GET["page"];
                        } else {
                            $page = 1;
                        }
                        break;  
                    case "searchByBreed":
                        // Code here to get params 
                        if (!isset($_GET["breed"])){
                            throw new Exception("Lack information", 400);
                        }
                        $breed = $_GET["breed"];
                        if(isset($_GET["page"])){
                            $page = $_GET["page"];
                        } else {
                            $page = 1;
                        }
                        break;
                    case "searchItem":
                        // Code here to get params 
                        if (!isset($_GET["keySearch"])){
                            throw new Exception("Lack information", 400);
                        }
                        if(isset($_GET["page"])){
                            $page = $_GET["page"];
                        } else {
                            $page = 1;
                        }
                        $keySearch = $_GET["keySearch"];
                } 
                break;
            case "POST": 
                break;
            case "PATCH":
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
