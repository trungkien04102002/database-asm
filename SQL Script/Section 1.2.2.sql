use orderingApp;
DELIMITER |

-- --------- TRIGGER CẬP NHẬT STATE CỦA ORDER TƯƠNG ỨNG VÀ SCORE,POINT CỦA KHÁCH HÀNG SAU KHI THÊM INSERT ORDERLOGS --------------
DROP TRIGGER IF EXISTS `update_state_score_point_afterAddOrderLog` |
CREATE TRIGGER `update_state_score_point_afterAddOrderLog` AFTER INSERT ON `orderlog`
FOR EACH ROW
BEGIN
    DECLARE $cus_id_update INT;
    DECLARE $branch_id_update INT;
    DECLARE $res_id_update INT;
    -- Update state
    UPDATE Orders
    SET state ='ready'
    WHERE `orders`.orderID = NEW.orderID; 

    -- Update coin
    SELECT cusID FROM orders WHERE orders.orderID = NEW.orderID INTO $cus_id_update ;

    UPDATE Customer
    SET accumulatedCoin = accumulatedCoin + NEW.coin
    WHERE customer.userID = $cus_id_update;

    -- Update score

    SELECT branchID FROM orders WHERE orders.orderID = NEW.orderID INTO $branch_id_update ;
    SELECT resID FROM branch WHERE branch.branchID = $branch_id_update INTO $res_id_update  ;

    UPDATE AccumulatedScore
    SET score = score + NEW.score
    WHERE AccumulatedScore.userID = $cus_id_update AND AccumulatedScore.resID = $res_id_update;
END|

-- --------- TRIGGER CẬP NHẬT SỐ LƯỢNG MÓN CỦA CÁC CATEGORY KHI MỘT DISH NÀO ĐÓ BỊ CẬP NHẬT THÀNH NOT AVAILABLE --------------
DROP TRIGGER IF EXISTS `update_num_of_dishes_in_categories_when_updating_dish` |
CREATE TRIGGER `update_num_of_dishes_in_categories_when_updating_dish` AFTER UPDATE ON Dish
FOR EACH ROW
main: BEGIN
	DECLARE $cateID INT;
	DECLARE $temp INT DEFAULT -1;
	DECLARE done BOOLEAN DEFAULT FALSE;
	DECLARE $belongToCates CURSOR FOR SELECT cateID FROM BelongTo WHERE dishID = NEW.dishID;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

	IF (NEW.isAvailable = true AND OLD.isAvailable = false) 
    THEN 
		SET $temp = 1;
	ELSEIF (NEW.isAvailable = OLD.isAvailable) THEN 
		LEAVE main;
    END IF;
    
	OPEN $belongToCates;
	cal: LOOP
		FETCH $belongToCates INTO $cateID;
		IF done = 1 THEN 
			LEAVE cal;
		END IF;
		UPDATE Category SET numberOfDishes = numberOfDishes + $temp WHERE cateID = $cateID;
	END LOOP;
	CLOSE $belongToCates;
END|

DELIMITER ;

UPDATE Dish SET dishDescription = "Ngon ngon ngon ghê" WHERE dishID = 1;
UPDATE Dish SET isAvailable = false  WHERE dishID = 1;
UPDATE Dish SET isAvailable = true  WHERE dishID = 1;
UPDATE Dish SET isAvailable = false  WHERE dishID = 12;
UPDATE Dish SET isAvailable = true  WHERE dishID = 12;

