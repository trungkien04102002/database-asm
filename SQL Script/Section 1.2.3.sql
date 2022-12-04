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
        SELECT dishName FROM Dish
	WHERE resID = $ResID
	ORDER BY dishName ASC;
    ELSE
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_error;
    END IF;
END;|
delimiter ;
