----------------------------------------------

DROP PROCEDURE IF EXISTS Employee_Of_Branch;
DELIMITER $$
CREATE PROCEDURE Employee_Of_Branch(
    IN Num INT
)
proc_label:BEGIN
    SELECT ID, employee.Name, Email, employee.Phone, Bdate, Sex, Address, Salary
    FROM employee
    JOIN branch ON employee.Bnumber = branch.Number
    WHERE branch.Number = Num
    ORDER BY Name;
END$$
DELIMITER ;
