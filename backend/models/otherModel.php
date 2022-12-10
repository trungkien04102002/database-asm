<?php 
    require_once("dbConnection.php");

    class OtherModel{

        public static function getAllRes($keySearch,$orderField){
            $keySearch = "%$keySearch%";

            $conn = DbConnection::getInstance();
            $sqlCmd = 'SELECT * FROM Restaurant WHERE resName LIKE ? ';
            if ($orderField == 1) {
                $sqlCmd .= "ORDER BY resID ";
            }
            else if ($orderField == 2) {
                $sqlCmd .= "ORDER BY resName";
            }

            $stmt = $conn->prepare($sqlCmd);
            $stmt->bind_param('s', $keySearch);
            $stmt->execute(); 
            $result = $stmt->get_result(); 
            $res = array();

            while ($row = $result->fetch_assoc()) {
                array_push($res, $row);
            }       
            return $res;
        }

        public static function getAllDishesFromARes($resID, $keySearch,$orderField){
            $keySearch = "%$keySearch%";

            $conn = DbConnection::getInstance();
            $sqlCmd = 'SELECT D.*, R.resName, get_rank_dish(D.dishID) as rank_dish FROM Dish D, Restaurant R WHERE D.resID = R.resID 
                    AND D.resID = ? AND dishName LIKE ? ';
            if ($orderField == 1) {
                $sqlCmd .= "ORDER BY dishID";
            }
            else if ($orderField == 2) {
                $sqlCmd .= "ORDER BY dishName";
            }
            else if ($orderField == 3) {
                $sqlCmd .= "ORDER BY unitPrice";
            }
            else if ($orderField == 4) {
                $sqlCmd .= "ORDER BY rank_dish";
            }
            $stmt = $conn->prepare($sqlCmd);
            $stmt->bind_param('is',$resID, $keySearch);
            $stmt->execute(); 
            $result = $stmt->get_result(); 
            $res = array();

            while ($row = $result->fetch_assoc()) {
                array_push($res, $row);
            }       
            return $res;
        }


        public static function getDishByID($dishID){
            $conn = DbConnection::getInstance();
            $sqlCmd = 'SELECT * FROM Dish WHERE dishID = ? ';

            $stmt = $conn->prepare($sqlCmd);
            $stmt->bind_param('i',$dishID);
            $stmt->execute(); 
            $result = $stmt->get_result(); 
            $row = $result->fetch_assoc();
     
            return $row;
        }

        public static function insertDish($dishName, $resID, $size, $isAvailable, $dishDescription, $unitPrice){
            $conn = DbConnection::getInstance();
            $sqlCmd = 'INSERT INTO Dish(dishName, resID, size, isAvailable, dishDescription, unitPrice)
                        VALUES (?,?,?,?,?,?)';
            $stmt = $conn->prepare($sqlCmd);
            $stmt->bind_param('sissss', $dishName, $resID, $size, $isAvailable, $dishDescription, $unitPrice);
            $stmt->execute(); 
            $dishID = $conn->insert_id;
            return OtherModel::getDishByID($dishID);
        }
        public static function updateDish($dishID, $dishName, $size, $isAvailable, $dishDescription, $unitPrice){
            $conn = DbConnection::getInstance();
            $sqlCmd = 'UPDATE Dish SET dishName = ?, size = ?, isAvailable = ?, dishDescription = ?, unitPrice = ? 
                        WHERE dishID = ?';

            $stmt = $conn->prepare($sqlCmd);
            $stmt->bind_param('ssissi', $dishName, $size, $isAvailable, $dishDescription, $unitPrice, $dishID);
            $stmt->execute(); 
     
            return OtherModel::getDishByID($dishID);
        }

        public static function deleteDish($dishID){
            $conn = DbConnection::getInstance();
            $sqlCmd = 'DELETE FROM Dish WHERE dishID = ? ';

            $stmt = $conn->prepare($sqlCmd);
            $stmt->bind_param('i',$dishID);
            $stmt->execute(); 
            $result = $stmt->get_result(); 
     
            return Array("msg"=>"success");
        }

        public static function getCountRes($minPayment){
            $conn = DbConnection::getInstance();
            $sqlCmd = 'CALL Count_Restaurant_Customer_Order_Success(?)';

            $stmt = $conn->prepare($sqlCmd);
            $stmt->bind_param('i',$minPayment);
            $stmt->execute(); 
            $result = $stmt->get_result(); 
            $customers = array();

            while ($row = $result->fetch_assoc()) {
                array_push($customers, $row);
            }  
            return $customers;
        }

    }
?>