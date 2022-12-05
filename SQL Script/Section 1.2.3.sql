use orderingApp;
delimiter |

-- Thủ tục liệt kê món ăn của nhà hàng bất kỳ, sắp xếp theo tên món ăn

DROP PROCEDURE IF EXISTS List_Dish_Of_Restaurant|
CREATE PROCEDURE List_Dish_Of_Restaurant(
    IN $ResID INT
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

-- Thủ tục lấy danh sách customerID và số nhà hàng mà khách hàng đó đã đặt mua với tổng số tiền lớn hơn một khoảng nào đó.alter
-- Ví dụ: Lấy danh sách các khách hàng và số nhà hàng má khách hàng đã đặt mua với tổng giá trị sản phẩm đặt hơn 100k.

DROP PROCEDURE IF EXISTS Count_Restaurant_Customer_Order_Success|
CREATE PROCEDURE Count_Restaurant_Customer_Order_Success($minPayment INT)
BEGIN

    SELECT customerID, COUNT(*) AS countRestaurant FROM 
		(SELECT r.resName AS resautant, c.userID AS customerID
		FROM Customer c, Orders o, Branch b, Restaurant r
		WHERE o.state = 'ready' AND o.branchID = b.branchID AND o.cusID = c.userID AND b.resID = r.resID
		GROUP BY r.resName, c.userID
		HAVING SUM(o.totalCost) > $minPayment) as temp
	GROUP BY customerID
    ORDER BY countRestaurant desc;
    
END;|



delimiter ;

-- ----------------------------------------------------
CALL List_Dish_Of_Restaurant(0); -- Lỗi do không tồn tại nhà hàng
CALL List_Dish_Of_Restaurant(1);
CALL List_Dish_Of_Restaurant(2);
CALL List_Dish_Of_Restaurant(3);
CALL List_Dish_Of_Restaurant(4);

CALL Count_Restaurant_Customer_Order_Success(10000);
CALL Count_Restaurant_Customer_Order_Success(100000);
CALL Count_Restaurant_Customer_Order_Success(110000);
