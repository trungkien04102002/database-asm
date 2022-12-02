<?php 
    require_once("dbConnection.php");

    class UserModel{
        public static function checkUserExistence($userName,$email = ''){
            $conn = DbConnection::getInstance();
            $stmt = $conn->prepare('SELECT userID FROM Customer WHERE email = ? OR userName = ?
                UNION SELECT userID FROM Admin WHERE email = ? OR userName = ?
                UNION SELECT userID FROM Owner WHERE email = ? OR userName = ?
                UNION SELECT userID FROM Employee WHERE email = ? OR userName = ?');
            $stmt->bind_param('ssssssss', $email,$userName, $email,$userName, $email,$userName, $email,$userName); // 's' specifies the variable type => 'string'
            $stmt->execute(); 
            $result = $stmt->get_result(); 
            $user = array();

            while ($row = $result->fetch_assoc()) {
                array_push($user, array("id" => $row["userID"]));
            }
            return (count($user) == 1);          
        }

        public static function createNewCus($email,$userName, $name, $sex, $phoneNumber, $password, $birthday){
            $conn = DbConnection::getInstance();
            $stmt = $conn->prepare("CALL insertCustomer(?,?,?,?,?,?,?)");
            $stmt->bind_param('sssssss', $userName, $email,  $password, $phoneNumber, $name,$birthday, $sex); // 's' specifies the variable type => 'string'
            $stmt->execute(); 
            $result = $stmt->get_result(); 


            $stmt = $conn->prepare('SELECT * FROM users WHERE email = ?');
            $stmt->bind_param('s', $email); 
            $stmt->execute(); 
            $result = $stmt->get_result();  
             
            if ($row = $result->fetch_assoc()) {
                $newUser = array("userID" => $row["userID"],"email" => $row["email"],"sex" => $row["sex"],
                    "isAdmin" => $row["isAdmin"],"accumulatedScore" => $row["accumulatedScore"], 
                    "phoneNumber" => $row["phoneNumber"]);
            }
            return $newUser;          
        }

        public static function getUserProfile($userName,$role){
            $conn = DbConnection::getInstance();
            if ($role != "Admin" && $role != "Customer" && $role != "Employee" && $role != "Owner"){
                throw new Exception("Role is invalid!", 400);
                return -1;
            }
            
            $stmt = $conn->prepare('SELECT * FROM ? WHERE userName = ?');
            $stmt->bind_param('ss', $role, $userName); // 's' specifies the variable type => 'string'
            $stmt->execute(); 
            $result = $stmt->get_result(); 
            $row = $result->fetch_assoc();
            $row["role"] = $role;
            unset($row["password"]);
            return $row;          
        }

     


        public static function comparePassword($userName,$password,$role){
            $conn = DbConnection::getInstance();
            if ($role != "Admin" && $role != "Customer" && $role != "Employee" && $role != "Owner"){
                throw new Exception("Role is invalid!", 400);
                return -1;
            }
            
            $stmt = $conn->prepare('SELECT password FROM ? WHERE userName = ?');
           
            $stmt->bind_param('ss',$role, $userName); // 's' specifies the variable type => 'string'
            $stmt->execute(); 
            $result = $stmt->get_result(); 
            $row = $result->fetch_assoc();
            return password_verify($password, $row["password"]);          
        }
        public static function updatePassword($userID,$password){
            $conn = DbConnection::getInstance();
            $stmt = $conn->prepare('UPDATE users SET password = ? WHERE userID = ?');
            $stmt->bind_param('si', $password,$userID); 
            $stmt->execute(); 
            return ["msg"=>"success"];          
        }
        public static function editProfile($email, $fullName, $phoneNumber, $sex){
            $conn = DbConnection::getInstance();
            $stmt = $conn->prepare('UPDATE users SET fullName = ?, phoneNumber = ?, sex = ? WHERE email = ?');
            $stmt->bind_param('ssss', $fullName, $phoneNumber, $sex, $email); 
            $stmt->execute(); 
            $result = $stmt->get_result(); 
            $stmt = $conn->prepare('SELECT * FROM users WHERE email = ?');
            $stmt->bind_param('s', $email); // 's' specifies the variable type => 'string'
            $stmt->execute(); 
            $result = $stmt->get_result(); 
            $row = $result->fetch_assoc();
            unset($row["password"]);
            return $row;          
        }
        public static function getAllUsers(){
            $conn = DbConnection::getInstance();
            $stmt = $conn->prepare('SELECT * FROM users WHERE isAdmin = false');
            $stmt->execute(); 
            $result = $stmt->get_result(); 
            $users = array();

            while ($row = $result->fetch_assoc()) {
                unset($row["password"]);
                array_push($users, $row);
            }       
            return $users;
        }
    }
?>