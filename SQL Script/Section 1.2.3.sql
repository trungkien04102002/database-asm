use orderingApp;
delimiter |

-- Thủ tục liệt kê món ăn của nhà hàng bất kỳ, sắp xếp theo tên món ăn

DROP PROCEDURE IF EXISTS List_Dish_Of_Restaurant|
CREATE PROCEDURE List_Dish_Of_Restaurant(
    IN ResID INT
)
BEGIN
    DECLARE message_error VARCHAR(1000) DEFAULT '';
    IF (NOT EXISTS (SELECT * FROM Restaurant WHERE resID = $ResID)) THEN
		SET message_error = 'THIS RESID DOES NOT EXIST!';
    END IF;
    
    IF message_error = '' THEN
        SELECT dishName AS Name FROM Dish
	WHERE resID = $ResID
	ORDER BY dishName ASC;
    ELSE
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_error;
    END IF;
END;|

-- Thủ tục lấy số khách hàng đặt hàng thành công ở các nhà hàng

DROP PROCEDURE IF EXISTS Count_Customer_Order_Success|
CREATE PROCEDURE Count_Customer_Order_Success(
    IN ResID INT
)
BEGIN
    DECLARE message_error VARCHAR(1000) DEFAULT '';
    IF (NOT EXISTS (SELECT * FROM Restaurant WHERE resID = $ResID)) THEN
		SET message_error = 'THIS RESID DOES NOT EXIST!';
    END IF;
    
    IF message_error = '' THEN
        SELECT COUNT(c.userID) 
	FROM Customer c, Orders o, Branch b
	WHERE o.state = 'ready' AND o.branchID = b.branchID AND o.cusID = c.userID AND b.resID = $ResID;
    ELSE
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_error;
    END IF;
END;|

delimiter ;
