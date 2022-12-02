use orderingApp;
DELIMITER |

-- --------- TRIGGER CẬP NHẬT STATE CỦA ORDER TƯƠNG ỨNG VÀ SCORE,POINT CỦA KHÁCH HÀNG SAU KHI THÊM INSERT ORDERLOGS --------------
DROP TRIGGER IF EXISTS `update_state_score_point_afterAddOrderLog`
DELIMITER $$
CREATE TRIGGER `update_state_score_point_afterAddOrderLog` AFTER INSERT ON `orderlog`
FOR EACH ROW
BEGIN
    -- Update state
    UPDATE `orders`
    SET state ='ready'
    WHERE `orders`.orderID = NEW.orderID; 

    -- Update coin
    DECLARE $cus_id_update INT;
    SELECT cusID FROM orders INTO $cus_id_update WHERE orders.orderID = NEW.orderID ;

    UPDATE `customer`
    SET accumulatedCoin = accumulatedCoin + NEW.coin
    WHERE customer.userID = $cus_id_update;

    -- Update score
    DECLARE $branch_id_update INT;
    DECLARE $res_id_update INT;
    SELECT branchID FROM orders INTO $branch_id_update WHERE orders.orderID = NEW.orderID ;
    SELECT resID FROM branch INTO $res_id_update WHERE branch.branchID = $branch_id_update ;

    UPDATE `AccumulatedScore`
    SET score = score + NEW.score
    WHERE accumulatedScore.userID = $cus_id_update, accumulatedScore.resID = $res_id_update;
END; 