<?php 
    require_once("dbConnection.php");

    class OtherModel{

        public static function getAllRes($page, $keySearch,$orderField){
            $record_per_page = 10;
            $start_from = ($page-1)*$record_per_page;
            $keySearch = "%$keySearch%";

            $conn = DbConnection::getInstance();
            $sqlCmd = 'SELECT * FROM Restaurant WHERE name LIKE ? LIMIT ?, ?';
            if ($orderField == 1) {
                $sqlCmd .= "ORDER BY resID";
            }
            else if ($orderField == 2) {
                $sqlCmd .= "ORDER BY resName";
            }

            $stmt = $conn->prepare($sqlCmd);
            $stmt->bind_param('sss', $keySearch, $start_from,$record_per_page);
            $stmt->execute(); 
            $result = $stmt->get_result(); 
            $res = array();

            while ($row = $result->fetch_assoc()) {
                array_push($res, $row);
            }       
            return $res;
        }


    }
?>