use orderingApp;
delimiter |

-- -----------HÀM TÍNH SỐ TIỀN MÀ MỘT KHÁCH HÀNG ĐÃ CHI CHO HỆ THỐNG-------
DROP FUNCTION IF EXISTS calculate_sum_of_money_paid|
CREATE FUNCTION calculate_sum_of_money_paid(customerID INT)
RETURNS INT READS SQL DATA
BEGIN
	DECLARE $sum INT DEFAULT 0;
	DECLARE $price INT DEFAULT 0;
	DECLARE done BOOLEAN DEFAULT FALSE;
	DECLARE $orderLogs CURSOR FOR SELECT afterVoucherCost FROM OrderLog O1, Orders O2
		WHERE O2.orderID = O1.orderID AND O2.cusID =  customerID;  
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
	IF (NOT EXISTS (SELECT * FROM Customer WHERE userID = customerID))
    THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'THIS USERID DOES NOT EXIST!';
        RETURN -1;
    END IF;

	OPEN $orderLogs;
	FETCH $orderLogs INTO $price;
	cal_sum: LOOP
		FETCH $orderLogs INTO $price;
		IF done = 1 THEN LEAVE cal_sum;
        SET $sum = $sum + $price;
		END IF;
	END LOOP;
	CLOSE $orderLogs;
	
	RETURN $sum;
END |

-- -----------HÀM XẾP LOẠI CỦA MÓN ĂN DỰA VÀO RATING -------
DROP FUNCTION IF EXISTS get_rank_dish|
CREATE FUNCTION get_rank_dish($dishID INT)
RETURNS VARCHAR(15) READS SQL DATA
BEGIN
	DECLARE $averageRate DOUBLE DEFAULT 0;
	IF (NOT EXISTS (SELECT * FROM Dish WHERE dishID = $dishID))
    THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'THIS DISH DOES NOT EXIST!';
        RETURN -1;
    END IF;
    
	IF (NOT EXISTS (SELECT * FROM Rating WHERE dishID = $dishID))
    THEN
        RETURN "NOT RATED";
    END IF;
    
    SELECT  AVERAGE(rating) AS averageRate INTO $averageRate FROM Rating WHERE dishID = $dishID ;

	IF ($averageRate < 1) THEN 
		RETURN "AWFUL";
    ELSEIF ($averageRate < 2) THEN
		RETURN "VERY BAD";
    ELSEIF ($averageRate < 3) THEN
		RETURN "BAD";
    ELSEIF ($averageRate < 4) THEN
		RETURN "GOOD";
	ELSEIF ($averageRate < 5) THEN
		RETURN "DELICIOUS";
	ELSEIF ($averageRate  = 5) THEN
		RETURN "WORLD CLASS";
	END IF;
END |
delimiter ;

SELECT calculate_sum_of_money_paid(10); -- USER NOT EXIST ---