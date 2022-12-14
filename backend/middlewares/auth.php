<?php 
    require_once __DIR__ . '/../vendor/autoload.php';
    require_once("../models/userModel.php");

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    function authenticate($token){
        $key = "datkienhoangphu";
        $user = JWT::decode($token, new Key($key, 'HS256'));
        if (!$user){
            throw new Exception("Cannot decode token!", 400);
        }

        return (array) $user;
    }

    function authenticateAdmin($token){
        $key = "datkienhoangphu";
        $user = JWT::decode($token, new Key($key, 'HS256'));
        if (!$user){
            throw new Exception("Cannot decode token!", 400);
        }

        if ($user->role != "Admin"){
            throw new Exception("Only admin can access this resource!", 400);
        }
        return (array) $user;
    }
?>