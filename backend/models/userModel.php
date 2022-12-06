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


            $stmt = $conn->prepare('SELECT * FROM customer WHERE email = ?');
            $stmt->bind_param('s', $email); 
            $stmt->execute(); 
            $result = $stmt->get_result();  
             
            $row = $result->fetch_assoc();
            unset($row["password"]);
            return $row;          
        }

        public static function getUserProfile($userName,$role){
            $conn = DbConnection::getInstance();
            if ($role != "Admin" && $role != "Customer" && $role != "Employee" && $role != "Owner"){
                throw new Exception("Role is invalid!", 400);
                return -1;
            }
            
            $stmt = $conn->prepare("SELECT * FROM $role WHERE userName = ?");
            $stmt->bind_param('s',  $userName); // 's' specifies the variable type => 'string'
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
            
            $stmt = $conn->prepare("SELECT password FROM $role WHERE userName = ?");
           
            $stmt->bind_param('s', $userName); // 's' specifies the variable type => 'string'
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

        public static function getAllCus($page, $keySearch,$orderField){
            $record_per_page = 10;
            $start_from = ($page-1)*$record_per_page;
            $keySearch = "%$keySearch%";

            $conn = DbConnection::getInstance();
            $sqlCmd = 'SELECT *, "Customer" as role, calculate_sum_of_money_paid(userID) as moneySpent FROM Customer WHERE name LIKE ?';
            if ($orderField == 1) {
                $sqlCmd .= " ORDER BY userID LIMIT ?, ?";
            }
            else if ($orderField == 2) {
                $sqlCmd .= " ORDER BY name LIMIT ?, ?";
            }
            else if ($orderField == 3) {
                $sqlCmd .= " ORDER BY email LIMIT ?, ?";
            }
            else if ($orderField == 4) {
                $sqlCmd .= ' ORDER BY moneySpent DESC LIMIT ?, ?';
            }
            $stmt = $conn->prepare($sqlCmd);
            $stmt->bind_param('sii', $keySearch, $start_from, $record_per_page);
            $stmt->execute(); 
            $result = $stmt->get_result(); 
            $customers = array();

            while ($row = $result->fetch_assoc()) {
                unset($row["password"]);
                array_push($customers, $row);
            }       
            return $customers;
        }
        public static function getCustomerByID($cusID){
            $conn = DbConnection::getInstance();
            $stmt = $conn->prepare('SELECT *, "Customer" as role, calculate_sum_of_money_paid(userID) as moneySpent FROM Customer WHERE userID = ?');
            $stmt->bind_param('i', $cusID);
            $stmt->execute(); 
            $result = $stmt->get_result(); 
            $row = $result->fetch_assoc();
      
            return $row;
        }
        public static function updateCustomer($cusID, $email, $name, $sex, $birthday, $password, $phoneNumber ){


            $conn = DbConnection::getInstance();
            $stmt = $conn->prepare('CALL updateCustomer(?,?,?,?,?,?,?)');
            $stmt->bind_param('issssss', $cusID, $email, $password, $phoneNumber, $name, $birthday, $sex);
            $stmt->execute(); 
              
            return UserModel::getCustomerByID($cusID);
        }

        public static function deleteCustomer($cusID){


            $conn = DbConnection::getInstance();
            $stmt = $conn->prepare('CALL deleteCustomer(?)');
            $stmt->bind_param('i',$cusID);
            $stmt->execute(); 
              
            return Array("msg"=>"success");
        }
    }
?>