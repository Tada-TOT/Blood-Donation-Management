/*--------------Schema----------------*/

/* CREATE SCHEMA bdm; */

/*--------------Tables----------------*/

/* CREATE TABLE Blood_Type (
Blood_Group 	CHAR(2) 		NOT NULL,
Rh_Factor 		CHAR 			NOT NULL,
PRIMARY KEY (Blood_Group, Rh_Factor)); */

/* CREATE TABLE Person (
National_ID		CHAR(10)		NOT NULL,
Address			VARCHAR(50) 			,
Weight			DECIMAL(5,2) 	NOT NULL,
FName			VARCHAR(15)		NOT NULL,
MName			VARCHAR(15) 			,
LName			VARCHAR(15) 	NOT NULL,
Birth_Date 		DATE			NOT NULL,
Gender 			CHAR			NOT NULL,
E_mail 			VARCHAR(50) 			,
Phone 			CHAR(10) 		NOT NULL,
Last_DDate 		DATE 					,
DFlag 			INT 					,
RFlag 			INT 					,
EFlag 			INT 					,
EID 			CHAR(9)   				,
Username 		VARCHAR(20) 	NOT NULL,
Password_		VARCHAR(20) 	NOT NULL,
is_Admin 		INT 					,
Blood_Group 	CHAR(2) 	 	NOT NULL,
Rh_Factor    	CHAR 			NOT NULL,
PRIMARY KEY (National_ID),
UNIQUE (Username),
FOREIGN KEY (Blood_Group, Rh_Factor) REFERENCES Blood_Type(Blood_Group, Rh_Factor)
); */

/* CREATE TABLE medical_history (
MHID 			CHAR(15)		NOT NULL,
PNational_ID	CHAR(10) 		NOT NULL,
Condition_ 		VARCHAR(15)  			,
Major_Diseases 	CHAR 			NOT NULL,
Treatment		VARCHAR(15) 			,
PRIMARY KEY (PNational_ID, MHID),
FOREIGN KEY (PNational_ID) REFERENCES Person(National_ID) ON DELETE CASCADE
); */

/* CREATE TABLE Inventory (
Inv_ID			INT(6)			NOT NULL		AUTO_INCREMENT,
Address			VARCHAR(30) 	NOT NULL,
Bags_Number 	INT  			NOT NULL,
PRIMARY KEY (Inv_ID)
); */

/* CREATE TABLE Blood_Bag (
Bag_ID 			INT(12)			NOT NULL		AUTO_INCREMENT,
Donation_Date 	DATE 	 		NOT NULL,
Volume  		DECIMAL(5,2) 	NOT NULL,
Status_ 	 	CHAR 			NOT NULL,
Price 			DECIMAL(5,2)			,
Room 			CHAR(4) 				,
Rack 			CHAR(2) 				,
Drawer 			CHAR(2)					,
BBlood_Group 	CHAR(2) 		NOT NULL,
BRh_Factor 		CHAR 			NOT NULL,
SInv_ID			INT(6) 			NOT NULL,
PRIMARY KEY (Bag_ID),
FOREIGN KEY (BBlood_Group, BRh_Factor) REFERENCES Blood_Type(Blood_Group, Rh_Factor),
FOREIGN KEY (SInv_ID) REFERENCES Inventory(Inv_ID) ON DELETE CASCADE
); */

/* CREATE TABLE Incident_History (
Incident_ID 	INT(6) 			NOT NULL		AUTO_INCREMENT,
Description_ 	VARCHAR(100) 			,
Date_ 			DATE  			NOT NULL,
Significance 	CHAR 			NOT NULL,
PRIMARY KEY (Incident_ID)
); */

/* CREATE TABLE Donation_Location (
Session_ID 		INT(6) 			NOT NULL		AUTO_INCREMENT,
DType 			CHAR 			NOT NULL,
CName 			VARCHAR(30) 			,
Scheduled_Date  DATE 					,
Blood_BQuantity INT 					, 
PRIMARY KEY (Session_ID)
); */

/* CREATE TABLE Receive (
PNational_ID 	CHAR(10) 		NOT NULL,
BBag_ID 		INT(12) 		NOT NULL,
Payment_Conf 	INT 					,
PRIMARY KEY (PNational_ID, BBag_ID),
FOREIGN KEY (PNational_ID) REFERENCES Person(National_ID) ON DELETE CASCADE,
FOREIGN KEY (BBag_ID) REFERENCES Blood_Bag(Bag_ID) ON DELETE CASCADE
); */

/* CREATE TABLE Involves (
IncidentH_ID 	INT(6) 			NOT NULL, 
BBag_ID 		INT(12) 		NOT NULL,
PRIMARY KEY (IncidentH_ID, BBag_ID),
FOREIGN KEY (IncidentH_ID) REFERENCES Incident_History(Incident_ID) ON DELETE CASCADE,
FOREIGN KEY (BBag_ID) REFERENCES Blood_Bag(Bag_ID) ON DELETE CASCADE
); */

/* CREATE TABLE Donate (
PNational_ID 	CHAR(10) 		NOT NULL,
BBag_ID 		INT(12) 		NOT NULL,
DSession_ID 	INT(6) 			NOT NULL,
PRIMARY KEY (PNational_ID, BBag_ID, DSession_ID),
FOREIGN KEY (PNational_ID) REFERENCES Person(National_ID) ON DELETE CASCADE,
FOREIGN KEY (BBag_ID) REFERENCES Blood_Bag(Bag_ID) ON DELETE CASCADE,
FOREIGN KEY (DSession_ID) REFERENCES Donation_Location(Session_ID) ON DELETE CASCADE
); */

/* CREATE TABLE Donate_Group (
BBlood_Group 	CHAR(2) 		NOT NULL,
BRh_Factor 		CHAR 			NOT NULL,
DBlood_Group 	CHAR(2) 		NOT NULL,
DRh_Factor 		CHAR 			NOT NULL,
PRIMARY KEY (BBlood_Group, BRh_Factor, DBlood_Group, DRh_Factor),
FOREIGN KEY (BBlood_Group, BRh_Factor) REFERENCES Blood_Type(Blood_Group, Rh_Factor),
FOREIGN KEY (DBlood_Group, DRh_Factor) REFERENCES Blood_Type(Blood_Group, Rh_Factor)
); */

/* CREATE TABLE Recipient_Group (
BBlood_Group 	CHAR(2) 		NOT NULL,
BRh_Factor 		CHAR 			NOT NULL,
RBlood_Group 	CHAR(2) 		NOT NULL,
RRh_Factor 		CHAR 			NOT NULL,
PRIMARY KEY (BBlood_Group, BRh_Factor, RBlood_Group, RRh_Factor),
FOREIGN KEY (BBlood_Group, BRh_Factor) REFERENCES Blood_Type(Blood_Group, Rh_Factor),
FOREIGN KEY (RBlood_Group, RRh_Factor) REFERENCES Blood_Type(Blood_Group, Rh_Factor)
); */

/*--------------Triggers & Events-----------------*/

/* CREATE EVENT outdated_blood
    ON SCHEDULE EVERY 1 DAY
    DO
      UPDATE bdm.blood_bag SET status_ = 'D' WHERE DATEDIFF(CURDATE(), Donation_Date) = 40 AND status = 'O';*/
      
/* CREATE EVENT schedule_drive
    ON SCHEDULE EVERY 3 MONTH
    DO
      INSERT INTO bdm.donation_location (DType, Scheduled_Date, Blood_BQuantity)
	  VALUES ('D', curdate(), null); */     
      
/* DELIMITER $$
CREATE TRIGGER update_ldd AFTER INSERT ON donate
	FOR EACH ROW BEGIN
		UPDATE person SET Last_DDate = curdate() WHERE person.National_ID = NEW.PNational_ID;
	END $$
DELIMITER; */