-- ------------------------------ ADMIN —-------------------------- 
INSERT INTO `orderingapp`.`admin`
(`userID`,`userName`,`sex`,`email`,`password`,`phoneNumber`,`birthday`,`name`)
VALUES
(1,'datluong123','M','datluong@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0979718180','2002-12-25','Lươn Đạt'),
(2,'trungkien0410','M','trungkien@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0979718670','2002-01-01','Trung Kiênt'),
(3,'thienphu234','M','thienphu@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0999999999','2002-09-15','Thiên Phú'),
(4,'nguyenhoang392','M','nguyenhoang@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0979756789','2002-02-04','Huy Hoàng');



-- ------------------------------ OWNER —--------------------------
INSERT INTO `orderingapp`.`owner` 
(`userID`,`userName`,`sex`,`email`,`password`,`phoneNumber`,`birthday`,`name`) VALUES
(1,'datluong1231','M','datluon1@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','099999999','2000-12-02','Lư Đạt'),
(2,'mason1232','M','mason2@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0999999998','2002-02-02','Lương Hiếu'),
(3,'antihero1233','M','datluon3@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0999999997','1995-05-02','Lương Kim'),
(4,'maroon1234','M','datluon4@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0999999996','2001-02-02','Lương Gia Khải');

-- ------------------------------ CUSTOMER —--------------------------

INSERT INTO `orderingapp`.`customer`
(`userID`,`userName`,`sex`,`email`,`password`,`phoneNumber`,`name`,`birthday`,`accumulatedCoin`)
VALUES
(1,'hoangD1','M','hoangnguyenR1@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0111111111','HoàngT 1','1990-02-01',93),
(2,'hoangT2','M','hoangnguyenV2@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0111111112','HoàngY 2','1990-03-02',370),
(3,'hoangH3','M','hoangnguyenM3@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0111111113','HoàngF 3','1990-04-03',0),
(4,'hoangZ4','M','hoangnguyenN4@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0111111114','HoàngD 4','1990-05-04',0),
(5,'hoangA5','M','hoangnguyenA5@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0111111115','HoàngJ 5','1990-06-05',45),
(6,'hoangC6','M','hoangnguyenB6@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0111111116','HoàngE 6','1990-07-06',156),
(7,'hoangB7','M','hoangnguyenF7@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0111111117','HoàngK 7','1990-08-07',0),
(8,'hoangY8','M','hoangnguyenC8@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0111111118','HoàngL 8','1990-09-08',0),
(9,'hoangO9','M','hoangnguyenU9@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0111111119','HoàngN 9','1990-10-06',45),
(10,'hoang10','M','hoangnguyen10@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0111111100','HoàngA 10','1990-11-10',0),
(11,'hoang11','M','hoangnguyen11@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0111111100','HoàngB 11','1991-02-10',0),
(12,'hoang12','M','hoangnguyen12@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0111111100','HoàngP 12','1992-02-10',0),
(13,'hoang13','M','hoangnguyen13@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0111111100','HoàngX 13','1993-02-10',0),
(14,'hoang14','M','hoangnguyen14@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0111111100','HoàngZ 14','1994-02-10',0);



-- -------------------------------RESTAURANT—----------------------------
INSERT INTO `orderingapp`.`restaurant`
(`resID`,`resIntro`,`resName`,`ownerID`)
VALUES
(1,'Một quán ăn mang đậm hương vị Hàn Quốc.','Hanuri', 1),
(2,'Chuyên phục vụ những món ăn ba miền Việt Nam được chế biến tỉ mỉ mới lạ và bổ dưỡng từ những thực phẩm tươi ngon.','Mộc Quán', 2),
(3,'Tự hào là thương hiệu cà phê và trà Việt Nam hiện đại dẫn đầu với sản phẩm ngon, giá cả hợp lý.','Highlands', 3),
(4,'Phúc Long liên tục là thương hiệu tiên phong với nhiều ý tưởng sáng tạo đi đầu trong ngành trà và cà phê.','Phúc Long', 4);




-- --------------------------------BRANCH—----------------------------
INSERT INTO `orderingapp`.`branch`
(`resID`,`branchID`,`houseNumber`,`district`,`street`)
VALUES
(1,1,'357','Q10','Ly Thuong Kiet'),
(1,2,'357','Q9','Vo Van Ngan'),
(1,3,'123','Q1','Hoang Dieu'),
(2,4,'123','Q3','Hoang Sa'),
(3,5,'123','Q2','Thao Dien'),
(3,6,'123','Q9','Le Van Viet'),
(4,7,'246','Q10','Hai Ba Trung'),
(4,8,'135','Q10','Dien Bien Phu');


-- Employee
INSERT INTO `orderingapp`.`employee`
(`userID`,`userName`,`sex`,`email`,`password`,`phoneNumber`,`name`,`birthday`,`branchID`)
VALUES
(1,'kienha1','F','kienha1@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0101111111','Kiên 1','1995-02-01',1),
(2,'kienha2','F','kienha2@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0101111112','Kiên 2','1995-02-02',2),
(3,'kienha3','F','kienha3@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0101111113','Kiên 3','1995-02-03',3),
(4,'kienha4','F','kienha4@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0101111114','Kiên 4','1995-02-04',4),
(5,'kienha5','F','kienha5@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0101111115','Kiên 5','1995-02-05',5),
(6,'kienha6','F','kienha6@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0101111116','Kiên 6','1995-02-06',6),
(7,'kienha7','F','kienha7@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0101111117','Kiên 7','1995-02-07',7),
(8,'kienha8','F','kienha8@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0101111118','Kiên 8','1995-02-08',8),
(9,'kienha9','F','kienha9@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0101111119','Kiên 9','1995-02-06',1),
(10,'kienha10','F','kienha10@gmail.com','$2y$10$/MnqhU72XAJM4IEg6QCpWu8zOBtxy6iskzPl04nf1VWlaRdUh5RYC','0101111100','Kiên 10','1995-02-10',2);


-- -------------------------------BrachPhoneNumber—----------------------------
INSERT INTO BranchPhoneNumber
(`branchNumber`,`branchID`)
VALUES
('0978716546','1'),
('0978122455','2'),
('0978162445','2'),
('0978122455','3'),
('0978955661','3'),
('0976655661','4'),
('0924456601','4');

-- ----------------------Dish—--------------------------
INSERT INTO `orderingapp`.`dish`
(`dishID`,`dishName`,`size`,`isAvailable`,`dishDescription`,`unitPrice`,`isSideDish`,`resID`)
VALUES
(1,'Trà sữa','M',1,'Thơm ngon bổ dưỡng',45000,0,1),
(2,'Trà sữa olong','L',1,'Thơm ngon bổ dưỡng cùng olong',48000,0,1),
(3,'Cacao','L',1,'Cacao giữa trời đông cô đơn',65000,0,1),
(4,'Tàu hủ nóng','M',1,'Mềm mịn thơm ngon',74000,0,4),
(5,'Tàu hủ đá','M',1,'Mát lạnh giữa mùa hè',34000,0,1),
(6,'Trà sữa kem cheese','M',1,'Thơm ngon bổ dưỡng với cheese',45000,0,1),
(7,'Trà gừng','M',1,'Ấm bụng hơn với gừng',64000,0,4),
(8,'Trà sữa cacao','L',1,'Béo ngậy vị cacao',29000,0,4),
(9,'Sữa chua','M',1,'Sánh mịn thơm ngon',39000,0,1),
(10,'Gà rán','M',1,'Giòn tan trong miệng',45000,0,1),
(11,'Bánh pudding','M',1,'Mềm mịn thơm ngon trong miệng',45000,0,3),
(12,'Bánh pizza','L',1,'Pizza đậm vị Pháp',48000,0,2),
(13,'Mì ý','L',1,'Mì ý cùng sốt cà chua và thịt bằm',65000,0,1),
(14,'Sushi','M',1,'Sushi đến từ Nhật Bản',74000,0,2),


(15,'Trân châu đen','M',1,'Béo mịn',2000,1,1),
(16,'Nước cốt dừa','M',1,'Thơm bùi',1000,1,1),
(17,'Khoai tây chiên','M',1,'Giòn rụm',15000,1,1),
(18,'Thịt thêm','M',1,'Thơm ngon',10000,1,1),
(19,'Trân châu trắng','M',1,'Giống y chang chân trâu đen, khác cái màu',2000,1,2),
(20,'Thạch dừa','M',1,'Ngọt thơm',5000,1,3),
(21,'Trân châu đen','M',1,'Béo mịn',2000,1,4);


-- ------------------------Eatwith—--------------------------
INSERT INTO EatWith
(`mainDishID`,`sideDishID`)
VALUES
(1,15),
(2,15),
(8,21),
(5,16),
(10,17),
(13,18),
(6,15),
(3,16),
(7,21),
(11,20);


-- ------------------------Category—--------------------------
INSERT INTO Category
(cateID, cateName, cateDescription, numberOfDishes)
VALUES
(1,'Trà sữa','Món nước yêu thích của giới trẻ',5),
(2,'Trà','Các loại trà thanh mát và thơm nhất',2),
(3,'Tàu hủ','Các loại tàu hủ ngon nhất',2),
(4,'Thức ăn nhanh','Cuộc sống vội quá phải không, ăn gì nhanh nhanh rồi đi làm thôi',2),
(5,'Món chính','Gọi gì cho cả nhà ăn đi nào!',3);

-- ------------------------Feedback—--------------------------
INSERT INTO `orderingapp`.`feedback`
(`dishID`,`feedbackNo`,`review`, `cusID`)
VALUES
(13,1,'Mì ý thơm ngon tuyệt vời, nước sốt cà chua hòa quyền với mì và thịt tạo nên vị cực chuẩn',2),
(5,2,'Tàu hủ đá mềm mịn, kết hợp với đá lạnh tạo nên một thức ăn giải khát tuyệt vời trong mùa hè nóng bức',8),
(7,3,'Trà thơm nhưng vị chưa thực sự ấn tượng',9),
(10,4,'Gà rán tuyệt vời, rất thơm ngon, kết hợp với tương ớt thì 10đ',1),
(2,5,'Trà sữa ngon ngọt',4);


-- ------------------------Rating—--------------------------
INSERT INTO `orderingapp`.`rating`
(`dishID`,`ratingNo`,`rating`,`cusID`)
VALUES
(13,1,4,2),
(5,2,5,8),
(7,3,2,9),
(10,4,3,1),
(10,5,1,2),
(10,6,2,3),
(10,7,5,4),
(10,8,5,5),
(10,9,5,6),
(5,10,5,7),
(5,11,5,8),
(5,12,4,9),
(5,13,4,1),
(4,14,1,2),
(4,15,1,3),
(4,16,2,1),
(4,17,2,5),
(4,18,2,6),
(4,19,1,7),
(2,20,0,2),
(3,21,2,1),
(3,22,3,2),
(3,23,2,3)
;


-- -----------------------Combo—--------------------------
INSERT INTO `orderingapp`.`combo`
(`comboID`,`unitPrice`,`comboName`,`resID`)
VALUES
(1,100000,'Combo 1 miếng gà giòn + 1 mỳ ý',1), 
(2,200000,'Combo 3 gà + 1 mỳ ý + 1 khoai tây chiên',1), 
(3,115000,'Combo 1 bánh pizza + sushi',2), 
(4,105000,'Combo 1 trà sữa olong + 1 cacao',1), 
(5,85000,'Combo 1 trà sữa olong + 1 trà sữa kem cheese',1),
(6,65000,'Combo 1 tàu hủ đá + 1 sữa chua',1),
(7,125000,'Combo 1 trà gừng + 1 tàu hủ nóng',4),
(8,110000,'Combo 1 trà sữa với trân châu đen và trà sữa ô long',1);

-- ------------------------ComboComponent—--------------------------
INSERT INTO `orderingapp`.`comboComponent`
(`componentID`,`quantity`,`comboName`,`dishID`)
VALUES
-- Combo 1
(1,1,'Combo 1 miếng gà giòn + 1 mỳ ý',1),
(2,1,'Combo 1 miếng gà giòn + 1 mỳ ý',10),
-- Combo 2
(3,3,'Combo 3 gà + 1 mỳ ý + 1 khoai tây chiên',10),
(4,1,'Combo 3 gà + 1 mỳ ý + 1 khoai tây chiên',13),
-- Combo 3
(6,1,'Combo 1 bánh pizza + sushi',12),
(7,1,'Combo 1 bánh pizza + sushi',14),
-- Combo 4
(9,1,'Combo 1 trà sữa olong + 1 cacao',2),
(10,1,'Combo 1 trà sữa olong + 1 cacao',8),
-- Combo 5
(11,1,'Combo 1 trà sữa olong + 1 trà sữa kem cheese',2),
(12,1,'Combo 1 trà sữa olong + 1 trà sữa kem cheese',6),
-- Combo 6
(13,1,'Combo 1 tàu hủ đá + 1 sữa chua',5),
(14,1,'Combo 1 tàu hủ đá + 1 sữa chua',9),
-- Combo 7
(15,1,'Combo 1 trà gừng + 1 tàu hủ nóng',7),
(16,1,'Combo 1 trà gừng + 1 tàu hủ nóng',4),
-- Combo 8
(17,1,'Combo 1 trà sữa với trân châu đen và trà sữa ô long',1),
(18,1,'Combo 1 trà sữa với trân châu đen và trà sữa ô long',2);

-- -----------------------WithSideDish—--------------------------

INSERT INTO `orderingapp`.`withSideDish`
(`dishID`,`componentID`,`quantitySideDish`)
VALUES
(17,2,1),
(15,9,1);

-- ------------------------ExchangeProgram—--------------------------
INSERT INTO `orderingapp`.`exchangeProgram`
(`programID`,`minPrice`,`numOfVoucherLeft`,`timeEnd`,`timeStart`,`description`)
VALUES
(1,10000,10,'2022-12-20','2022-11-01','Chương trình sale cho khách hàng trên hệ thống sử dụng điểm'),
(2,15000,10,'2023-02-20','2022-12-01','Chương trình sale cho khách hàng trên hệ thống sử dụng điểm'),
(3,20000,10,'2023-01-01','2022-11-15','Chương trình sale cho khách hàng trên hệ thống sử dụng Coin'),
(4,16000,10,'2023-06-30','2023-05-30','Chương trình sale cho khách hàng trên hệ thống sử dụng Coin');

-- -----------------------VoucherExchangeByScore—--------------------------
INSERT INTO `orderingapp`.`voucherExchangeByScore`
(`programID`,`percentDiscount`,`exchangingScore`,`maxDiscountPrice`,`resID`)
VALUES
(1,10,50,10000,1),
(2,20,60,12000,2);

-- ------------------------VouhcerExchangeByCoin—--------------------------
INSERT INTO `orderingapp`.`voucherExchangeByCoin`
(`programID`,`priceDiscount`,`exchangingScore`,`adminID`)
VALUES
(3,500000,6000,1),
(4,700000,7000,2);
-- -----------------------Orders—--------------------------

INSERT INTO `orderingapp`.`orders`
(`orderID`,`shippingCost`,`isDirectPay`,`afterVoucherCost`,`totalCost`,`state`,`district`,`houseNumber`,`street`,`branchID`,`cusID`)
VALUES
(1,0,true,93000,93000,'ready','Q10',10,'Ly Thuong Kiet',1,1),   -- RES 1 Done 
(2,0,true,130000,130000,'ready','Q10',20,'Dinh Tien Hoang',5,2),  -- RES 3 Done
(3,0,true,150000,150000,'pending','Q10',30,'Ly Thuong Kiet',7,3), -- RES 4
(4,0,true,138000,138000,'ready','Q10',50,'Hai Ba Trung',4,2), -- RES 2 Done
(5,0,true,156000,156000,'ready','Q10',100,'Dien Bien Phu',6,5), -- RES 3 Done
(6,10000,false,258000,258000,'pending','Q10',30,'Ly Thuong Kiet',2,6), -- RES 1
(7,20000,false,135000,135000,'pending','Q10',50,'Hai Ba Trung',4,7),  -- RES 2
(8,15000,false,102000,102000,'ready','Q10',100,'Dien Bien Phu',8,2), -- RES 4
(9,20000,false,102000,102000,'ready','Q10',100,'Ha Trung Kien',3,9), -- Combo RES 1
(10,15000,true,130000,130000,'pending','Q10',100,'Vo Van Ngan',4,10),-- Combo RES 2
(11,25000,true,150000,150000,'pending','Q10',90,'Hoang Dieu',7,1), 
(12,10000,true,45000,45000,'ready','Q9',90,'Ly Thai To',3,5);  -- RES 1


-- -----------------------Voucher—--------------------------
INSERT INTO `orderingapp`.`voucher`
(`voucherID`,`isUsed`,`dateExchange`,`programID`,`cusID`)
VALUES
(1,0,'2022-12-30',1,9),
(2,0,'2023-3-23',2,2);



INSERT INTO `orderingapp`.`transaction`
(`transactionID`,`codePayment`,`paymentDate`,`paymentMethod`,`orderID`)
VALUES
(1,1,'2022-12-01','Momo',8),
(2,2,'2022-12-02','ZaloPay',9);

-- -------------------------ShippingAgent—--------------------------
INSERT INTO `orderingapp`.`shippingAgent`
(`agentID`,`agentName`)
VALUES
('1','Giao hàng tiết kiệm'),
('2','Viettel Post'),
('3','JT Express'),
('4','SuperShip'),
('5','VN Post');

-- ------------------------AccumulatedScore—--------------------------
INSERT INTO `orderingapp`.`accumulatedScore`
(`resID`,`score`,`userID`)
VALUES
(1,93,1),
(3,130,2),
(2,78,2),
(3,156,6),
(4,102,2),
(1,52,9),
(1,45,5);

-- ~~~~~~~~~~~~Order log~~~~~~~~~~~~~~~~~~


INSERT INTO `orderingapp`.`orderlog`
(`orderID`,`logID`,`score`,`shippingTime`,`coin`,`shippingCode`,`agentID`,`employeeID`)
VALUES
(1,1,93,'2022-12-01',93,1,1,1),  -- RES 1 
(2,2,130,'2022-12-01',130,2,2,5), -- RES 3
(4,3,138,'2022-12-01',138,3,3,4), -- RES 2
(5,4,156,'2022-12-01',156,4,4,6), -- RES 3
(8,5,102,'2022-12-01',102,5,5,8), -- RES 4
(9,6,120,'2022-12-02',120,6,5,3), -- Combo RES 1
(12,7,45,'2022-12-01',45,7,5,3); -- RES 1


-- ------------------------Item —--------------------------
INSERT INTO `orderingapp`.`item`
(`itemID`,`dishID`,`quantity`,`price`,`orderID`)
VALUES
(1,1,1,45000,1), -- RES 1
(2,2,1,48000,1),
(3,3,2,65000,2), -- RES 3
(4,4,3,50000,3), -- RES 4
(5,6,2,45000,4), -- RES 2
(6,10,1,48000,4),
(7,7,1,60000,5), -- RES 3
(8,11,2,48000,5),
(9,1,3,45000,6), -- RES 1
(10,2,1,45000,6),
(11,9,2,39000,6),
(12,14,1,70000,7), -- RES 2
(13,10,1,45000,7),
(14,8,3,29000,8), -- RES 4
(15,1,1,45000,12);





-- -----------------------AddSideDishToItem—--------------------------
INSERT INTO AddSideDishToItem
(`sideDish`,`priceSideDish`,`quantitySideDish`,`itemID`)
VALUES
(1,12.5,2,1),
(2,20.5,1,2),
(5,5.5,3,3),
(4,17.5,1,2),
(8,3.5,2,4);

-- ------------------------IncludeCombo—--------------------------
INSERT INTO `orderingapp`.`includeCombo`
(`orderID`,`quantity`,`price`,`comboID`)
VALUES
(9,1,100000,1), -- RES 1
(10,1,115000,3), -- RES 2
(11,1,125000,7); -- RES 4


-- -----------------------BelongTo—--------------------------
INSERT INTO `orderingapp`.`belongTo`
(`cateID`,`dishID`)
VALUES
(1,1),
(1,6),
(1,3),
(1,8),
(1,9),
(2,2),
(2,7),
(3,4),
(3,5),
(4,10),
(4,11),
(4,12),
(4,13),
(5,12),
(5,13),
(5,14);
