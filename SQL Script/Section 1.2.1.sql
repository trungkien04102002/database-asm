use orderingApp;
delimiter |

-- Hàm hỗ trợ cho việc kiểm tra tuổi của khách hàng
DROP FUNCTION IF EXISTS check_age_customer|
CREATE FUNCTION check_age_customer(birthday DATE) RETURNS BOOL DETERMINISTIC
RETURN birthday IS NULL OR (15 <= floor(datediff (now(), birthday)/365) AND floor(datediff (now(), birthday)/365) <= 150)|

-- Hàm hỗ trợ cho việ c kiểm tra số điện thoại của khách hàng
DROP FUNCTION IF EXISTS check_phone_customer|
CREATE FUNCTION check_phone_customer(phoneNumber varchar(10))
RETURNS VARCHAR(200) DETERMINISTIC
BEGIN
	DECLARE flag VARCHAR(1000) DEFAULT 'TRUE';
	IF phoneNumber IS NULL THEN
		SET flag = 'TRUE';
	ELSEIF char_length(phoneNumber) != 10 THEN
		SET flag = 'THE LENGTH OF PHONE NUMBER MUST BE 10';
	ELSEIF NOT phoneNumber REGEXP '^[0-9]+$' THEN 
		SET flag = 'PHONE NUMBER MUST CONTAIN DIGITS';
    END IF;
	RETURN flag;
END |

-- Hàm hỗ trợ cho việc kiểm tra email của khách hàng
DROP FUNCTION IF EXISTS check_email_customer|
CREATE FUNCTION check_email_customer(email varchar(50))
RETURNS BOOL DETERMINISTIC
BEGIN
	IF (email IS NULL OR email REGEXP
	'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)') THEN
		RETURN true;
	ELSE
		RETURN false;
	END IF;
END |

-- ------------------------------THỦ TỤC THÊM CUSTOMER---------------------
DROP PROCEDURE IF EXISTS insertCustomer | 
CREATE PROCEDURE insertCustomer 
	(IN $userName varchar(25), IN $email varchar(50) , IN $password varchar(100), 
    IN $phoneNumber varchar(10), IN $name varchar(25), IN $birthday DATE, IN $sex CHAR(1))
BEGIN
    DECLARE message_error VARCHAR(1000) DEFAULT '';
    IF (EXISTS (SELECT userID FROM Customer WHERE email = $email OR userName = $userName
		UNION SELECT userID FROM Admin WHERE email = $email OR userName = $userName
		UNION SELECT userID FROM Owner WHERE email = $email OR userName = $userName
		UNION SELECT userID FROM Employee WHERE email = $email OR userName = $userName
    )) THEN 
		SET message_error = 'USER HAS ALREADY EXISTED';
	ELSEIF $sex != 'F' AND $sex != 'M' THEN
		SET message_error = 'SEX MUST BE F OR M';
	ELSEIF check_age_customer($birthday) = false THEN
		SET message_error = 'AGE IS NOT VALID, CUSTOMER MUST BE AT LEAST 15 YEARS OLD AND ALIVE';
	ELSEIF ( check_phone_customer($phoneNumber) != 'TRUE') THEN
		SET message_error = check_phone_customer($phoneNumber) ;
	ELSEIF ( check_email_customer($email) = false) THEN
		SET message_error = 'EMAIL IS NOT VALID' ;
    END IF;
    IF message_error = '' THEN
		INSERT INTO Customer (userName,sex,email,password,phoneNumber,name,birthday) VALUES
		($userName,$sex,$email,$password,$phoneNumber,$name,$birthday);
	ELSE
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_error;
	END IF;


END;|



-- ------------------------------THỦ TỤC CẬP NHẬT CUSTOMER---------------------
-- Chỉ cho phép cập nhật lại email, birthday, sex, password, phoneNumber, name
DROP PROCEDURE IF EXISTS updateCustomer | 
CREATE PROCEDURE updateCustomer 
	(IN $updatedUserID INT, IN $email varchar(50) , IN $password varchar(100), 
    IN $phoneNumber varchar(10), IN $name varchar(25), IN $birthday DATE, IN $sex CHAR(1))
BEGIN
    DECLARE message_error VARCHAR(1000) DEFAULT '';
    IF (NOT EXISTS (SELECT * FROM Customer WHERE userID = $updatedUserID)) THEN
		SET message_error = 'THIS USERID DOES NOT EXIST!';
	ELSEIF ($email != (SELECT email FROM Customer WHERE userID = $updatedUserID ) 
		AND (EXISTS (SELECT userID FROM Customer WHERE email = $email
			UNION SELECT userID FROM Admin WHERE email = $email
			UNION SELECT userID FROM Owner WHERE email = $email
			UNION SELECT userID FROM Employee WHERE email = $email
    ))) THEN 
		SET message_error = 'THIS EMAIL HAS BEEN USED BY OTHER USER';
	ELSEIF $sex != 'F' AND $sex != 'M' THEN
		SET message_error = 'SEX MUST BE F OR M';
	ELSEIF check_age_customer($birthday) = false THEN
		SET message_error = 'AGE IS NOT VALID, CUSTOMER MUST BE AT LEAST 15 YEARS OLD AND ALIVE';
	ELSEIF ( check_phone_customer($phoneNumber) != 'TRUE') THEN
		SET message_error = check_phone_customer($phoneNumber) ;
	ELSEIF ( check_email_customer($email) = false) THEN
		SET message_error = 'EMAIL IS NOT VALID' ;
    END IF;
    IF message_error = '' THEN
		UPDATE Customer
		SET
			`sex` = $sex,
			`email` = $email,
			`password` = $password,
			`phoneNumber` = $phoneNumber,
			`name` = $name,
			`birthday` = $birthday
		WHERE `userID` = $updatedUserID;
	ELSE
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_error;
	END IF;
END;|

-- ------------------------------THỦ TỤC XÓA CUSTOMER---------------------
DROP PROCEDURE IF EXISTS deleteCustomer | 
CREATE PROCEDURE deleteCustomer 
	(IN deletedUserID INT)
BEGIN
    IF (NOT EXISTS (SELECT * FROM Customer WHERE userID = deletedUserID)) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'THIS USERID DOES NOT EXIST!';
	ELSE 
		DELETE FROM Customer WHERE userID = deletedUserID;
    END IF;
	
END;|
delimiter ;

-- ----------------Dữ liệu chạy thử---------------
CALL insertCustomer('daylataikhoanthu','datluong@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0999999999'
,'Nguyễn Thử', '1988-12-03','F'); -- Trùng với email admin
CALL insertCustomer('kienha1','datdtttt@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0999999999'
,'Nguyễn Thử', '1988-12-03','F'); -- Trùng với userName employee
CALL insertCustomer('kienhas1','nguyenthu@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0999999999'
,'Nguyễn Thử', '1988-12-03','A'); -- Giới tính không hợp lệ
CALL insertCustomer('daylataikhoanthu','nguyenthu@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0999999999'
,'Nguyễn Thử', '2022-12-03','F'); -- Độ tuổi invalid
CALL insertCustomer('daylataikhoanthu','nguyenthu@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','12345'
,'Nguyễn Thử', '1989-12-03','F'); -- SĐT không đủ dộ dài.
CALL insertCustomer('daylataikhoanthu','nguyenthu@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','099A999999'
,'Nguyễn Thử', '1989-12-03','F'); -- Số điện thoại không hợp lệ
CALL insertCustomer('daylataikhoanthu','nguyenthugmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0999999999'
,'Nguyễn Thử', '1989-12-03','F'); -- Email không hợp lệ
CALL insertCustomer('daylataikhoanthu','nguyenthu@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0999999999'
,'Nguyễn Thử', '1989-12-03','F');  -- Hợp lệ
-- ----------------------------------------

CALL updateCustomer(1,'datluong@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','1111111111'
,'Nguyễn Thi A', '1989-12-23','M');
CALL updateCustomer(1,'nguyenthu@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','1111111111'
,'Nguyễn Thi', '2021-12-23','M');
CALL updateCustomer(1,'nguyenthu123@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','1111111111'
,'Nguyễn Thi A', '1989-12-23','O');
CALL updateCustomer(1,'nguyenthu@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','111111'
,'Nguyễn Thi', '1989-12-23','M');
CALL updateCustomer(1,'nguyenthu@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','11ab111111'
,'Nguyễn Thi', '1989-12-23','M');
CALL updateCustomer(1,'gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','1111111111'
,'Nguyễn Thi', '1989-12-23','M');
CALL updateCustomer(1,'nguyenthu123@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','1111111111'
,'Nguyễn Thi A', '1989-12-23','M');

-- -----------------------------
CALL deleteCustomer(0);
CALL deleteCustomer(11);