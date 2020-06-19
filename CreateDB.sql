USE [Portfolio]

create table Users
(
id int not null,
Name char(255) not null,
Login char(255) not null UNIQUE,
Password char(255) not null,
PRIMARY KEY (ID)
)
GO;



CREATE TABLE StatDetails (
    Id int NOT NULL,
	Date date not null,
	User_id int not null,
    Ticker char(50) not null,
	Price float,
	Cnt int,
    PRIMARY KEY (ID),
	FOREIGN KEY (User_id) REFERENCES Users(ID)
)		   
GO;


CREATE TABLE StatAgregated (
	Date date not null,
	User_id int not null,
	Invested float not null,
	PortfolioCost float not null,
	CONSTRAINT PK_Update PRIMARY KEY (Date, User_id),
	FOREIGN KEY (User_id) REFERENCES Users(ID)
)
GO;


 


/* ------------------------------------------------------- */

CREATE VIEW [dbo].[vw_StatDetails]
AS
SELECT        User_id, Ticker, SUM(Cnt) AS Cnt
FROM            dbo.StatDetails
GROUP BY User_id, Ticker
HAVING        (SUM(Cnt) > 0)
GO;