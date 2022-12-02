create schema if not exists orderingApp;
use orderingApp;

CREATE TABLE Admin
(
    userID	INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(25) NOT NULL UNIQUE,
    sex CHAR(1)  DEFAULT 'F',
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    phoneNumber VARCHAR(10) NOT NULL,
	birthday DATE NOT NULL,
    name VARCHAR(25) NOT NULL
);

CREATE TABLE Owner
(
    userID	INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(25) NOT NULL UNIQUE,
    sex CHAR(1)DEFAULT 'F',
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    phoneNumber VARCHAR(10) NOT NULL,
	birthday DATE NOT NULL,
    name VARCHAR(25) NOT NULL
);

CREATE TABLE Customer 
(
    userID	INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(25) NOT NULL UNIQUE,
    sex CHAR(1)DEFAULT 'F',
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    phoneNumber VARCHAR(10) NOT NULL,
    name VARCHAR(25) NOT NULL,
	birthday DATE NOT NULL,
    accumulatedCoin INT NOT NULL DEFAULT 0
);

CREATE TABLE Restaurant 
(	
	resID INT PRIMARY KEY AUTO_INCREMENT,
	resIntro varchar(500) DEFAULT '',
	resName varchar(50) NOT NULL UNIQUE,
	ownerID int NOT NULL UNIQUE,
	FOREIGN KEY(ownerID) REFERENCES Owner(userID)
);

CREATE TABLE Branch 
(	
	resID	INT	NOT NULL,
	branchID	INT PRIMARY KEY AUTO_INCREMENT,
	houseNumber INT NOT NULL,
	district VARCHAR(20) NOT NULL,
	street VARCHAR(25) NOT NULL,
	FOREIGN KEY(resID) REFERENCES Restaurant(resID)
);

CREATE TABLE Employee
(
    userID	INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(25) NOT NULL UNIQUE,
    sex CHAR(1)DEFAULT 'F',
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    phoneNumber VARCHAR(10) NOT NULL,
    name VARCHAR(25) NOT NULL,
	birthday DATE NOT NULL,
    branchID int NOT NULL,
    FOREIGN KEY(branchID) REFERENCES Branch(branchID)
);

CREATE TABLE BranchPhoneNumber
(	
	branchNumber varchar(11) NOT NULL,
	branchID int NOT NULL,
	FOREIGN KEY(branchID) REFERENCES Branch(branchID),
   	PRIMARY KEY(branchID, branchNumber)
);

CREATE TABLE Dish 
(	
	dishID	INT PRIMARY KEY AUTO_INCREMENT,
	dishName VARCHAR(40) NOT NULL UNIQUE,
	size CHAR(1),
	isAvailable BOOL NOT NULL DEFAULT true ,
	dishDescription TEXT(400),
	unitPrice INT NOT NULL,
	isSideDish BOOL NOT NULL DEFAULT false,
	resID INT NOT NULL,
	FOREIGN KEY(resID) REFERENCES Restaurant(resID)
);

CREATE TABLE EatWith 
(	
	mainDishID int NOT NULL,
	sideDishID int NOT NULL,
	PRIMARY KEY(mainDishID, sideDishID),
   	FOREIGN KEY(mainDishID) REFERENCES Dish(dishID),
   	FOREIGN KEY(sideDishID) REFERENCES Dish(dishID)

);


CREATE TABLE Category
(	
    cateID INT PRIMARY KEY AUTO_INCREMENT,
    dishName VARCHAR(40) NOT NULL UNIQUE,
    numberOfDishes INT DEFAULT 0,
    cateDescription TEXT(200) 
);


CREATE TABLE Feedback
(	
    dishID INT NOT NULL,
    feedbackNo INT NOT NULL, 
    review TEXT(300),
    cusID INT NOT NULL,
    FOREIGN KEY(cusID) REFERENCES Customer(userID),
    FOREIGN KEY(dishID) REFERENCES Dish(dishID),
    PRIMARY KEY(dishID,feedbackNo)   
);

CREATE TABLE Rating
(	
    dishID INT NOT NULL,
    ratingNo INT NOT NULL, 
    rating DOUBLE DEFAULT 5,
    cusID INT NOT NULL,
    FOREIGN KEY(cusID) REFERENCES Customer(userID),
    FOREIGN KEY(dishID) REFERENCES Dish(dishID),
    PRIMARY KEY(dishID,ratingNo)   
);

CREATE TABLE Combo
(
    comboID INT PRIMARY KEY AUTO_INCREMENT,
    unitPrice DOUBLE DEFAULT 250000,
    comboName VARCHAR(40) NOT NULL UNIQUE,
    resID	INT	NOT NULL,
    FOREIGN KEY(resID) REFERENCES Restaurant(resID)
);

CREATE TABLE ComboComponent 
(
    componentID INT PRIMARY KEY AUTO_INCREMENT,
    quantity INT NOT NULL DEFAULT 1,
    comboName VARCHAR(40) NOT NULL,
    dishID	INT	NOT NULL,
    FOREIGN KEY(comboName) REFERENCES Combo(comboName),
    FOREIGN KEY(dishID) REFERENCES Dish(dishID)
); 

CREATE TABLE WithSideDish
(
    dishID INT NOT NULL,
    componentID	INT	NOT NULL,
    quantitySideDish INT NOT NULL DEFAULT 1,
    FOREIGN KEY(dishID) REFERENCES Dish(dishID),
    FOREIGN KEY(componentID) REFERENCES ComboComponent(componentID),
    PRIMARY KEY(dishID,componentID)
); 




CREATE TABLE ExchangeProgram(
  programID INT PRIMARY KEY AUTO_INCREMENT,
  minPrice INT NOT NULL,
  numOfVoucherLeft INT NOT NULL DEFAULT 10,
  timeEnd DATE NOT NULL,
  timeStart DATE NOT NULL,
  description TEXT(200) 
);

CREATE TABLE VoucherExchangeByScore(
  programID INT PRIMARY KEY AUTO_INCREMENT,
  percentDiscount INT NOT NULL,
  exchangingScore INT NOT NULL,
  maxDiscountPrice INT NOT NULL,
  resID INT NOT NULL ,
  FOREIGN KEY(programID) REFERENCES ExchangeProgram(programID),
  FOREIGN KEY(resID) REFERENCES Restaurant(resID)
);

CREATE TABLE VouhcerExchangeByCoin(
  programID INT PRIMARY KEY AUTO_INCREMENT,
  priceDiscount INT NOT NULL,
  exchangingScore INT NOT NULL,
  adminID INT NOT NULL ,
  FOREIGN KEY(programID) REFERENCES ExchangeProgram(programID),
  FOREIGN KEY(adminID) REFERENCES Admin(userID)
);

CREATE TABLE Orders
(
    orderID INT PRIMARY KEY AUTO_INCREMENT,
    shippingCost INT NOT NULL,
    isDirectPay boolean DEFAULT true ,
    afterVoucherCost INT NOT NULL,
    totalCost INT NOT NULL,
    state VARCHAR(20) NOT NULL,
    district VARCHAR(20) NOT NULL,
    houseNumber INT NOT NULL,
    street VARCHAR(20) NOT NULL,
    branchID INT NOT NULL,
    cusID INT NOT NULL,
    FOREIGN KEY (branchID) REFERENCES Branch(branchID)
);

CREATE TABLE Voucher(
	voucherID INT PRIMARY KEY AUTO_INCREMENT,
	isUsed BOOL DEFAULT false NOT NULL,
	dateExchange DATE NOT NULL,
	programID INT NOT NULL ,
	cusID INT NOT NULL ,
	orderID INT NOT NULL ,
	FOREIGN KEY(cusID) REFERENCES Customer(userID),
	FOREIGN KEY(programID) REFERENCES ExchangeProgram(programID),
	FOREIGN KEY(orderID) REFERENCES Orders(orderID)
);





CREATE TABLE Transaction(
  transactionID INT PRIMARY KEY AUTO_INCREMENT,
  codePayment INT NOT NULL,
  paymentDate DATE NOT NULL,
  paymentMethod VARCHAR(25) NOT NULL,
  orderID INT NOT NULL UNIQUE ,
  FOREIGN KEY(orderID) REFERENCES Orders(orderID)
);

CREATE TABLE ShippingAgent(
  agentID INT PRIMARY KEY AUTO_INCREMENT,
  agentName VARCHAR(40) NOT NULL UNIQUE
);


CREATE TABLE AccumulatedScore
(
    resID INT,
    score INT, 
    userID INT,
    PRIMARY KEY(resID, userID),
    FOREIGN KEY(resID) REFERENCES Restaurant(resID),
    FOREIGN KEY(userID) REFERENCES Customer(userID)

);

CREATE TABLE OrderLog
(
    orderID INT NOT NULL,
    logID INT PRIMARY KEY AUTO_INCREMENT,
    score INT NOT NULL DEFAULT 0,
    shippingTime DATE,
    coin INT NOT NULL DEFAULT 0,
    shippingCode INT,
    agentID INT,
    employeeID INT NOT NULL ,
    FOREIGN KEY(orderID) REFERENCES Orders(orderID),
    FOREIGN KEY(employeeID) REFERENCES Employee(userID),
    FOREIGN KEY(agentID) REFERENCES ShippingAgent(agentID)
);


CREATE TABLE Item
(
    itemID INT PRIMARY KEY AUTO_INCREMENT, 
    dishID INT NOT NULL,
    quantity INT NOT NULL,
    price DOUBLE NOT NULL,
    orderID INT NOT NULL,
    FOREIGN KEY(dishID) REFERENCES Dish(dishID),
    FOREIGN KEY(orderID) REFERENCES Orders(orderID)
);


CREATE TABLE AddSideDishToItem
(
    sideDish INT NOT NULL,
    priceSideDish DOUBLE NOT NULL,
    quantitySideDish INT NOT NULL,
    itemID INT NOT NULL, 
    PRIMARY KEY(sideDish, itemID),
    FOREIGN KEY(sideDish) REFERENCES Dish(dishID),
    FOREIGN KEY(itemID) REFERENCES Item(itemID)

);



CREATE TABLE IncludeCombo
(
    orderID INT NOT NULL,
    quantity INT NOT NULL,
    price DOUBLE NOT NULL,
    comboID INT NOT NULL,
    PRIMARY KEY (orderID, comboID),
    FOREIGN KEY(orderID) REFERENCES Orders(orderID),
    FOREIGN KEY(comboID) REFERENCES Combo(comboID)
);

CREATE TABLE BelongTo
(
     cateID INT NOT NULL,
     dishID INT NOT NULL,
     PRIMARY KEY(cateID, dishID),
     FOREIGN KEY(cateID) REFERENCES Category(cateID),
     FOREIGN KEY(dishID) REFERENCES Dish(dishID)
);
