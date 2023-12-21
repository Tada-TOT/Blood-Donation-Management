<?php

	class AdminGateway
	{
		private PDO $conn;
		
		public function __construct(DataBase $database)
		{
			$this->conn = $database->connection();
			
			if(! $this->conn){
				echo("Error: MySQL Server Connection Failed!");
			}
		}
		
		public function getALLPDRU(string $userType): array
		{
			$sql1 = "SELECT *
					FROM person
					WHERE $userType = '1'";
			$sql2 = "SELECT *
					FROM person";
			
			if ($userType == "ALL")
			{
				$sql = $sql2;
			}
			else 
			{
				$sql = $sql1;
			}
			
			$stmt = $this->conn->query($sql);
			
			$data = [];
			
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$data[] = $row;
			}
			
			return $data;
		}
		
		public function getHistory(string $table, string $national_ID): array
		{
			$sql = "SELECT *
					FROM $table 
					WHERE PNational_ID = $national_ID";
					
			$stmt = $this->conn->query($sql);
			
			$data = [];
			
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$data[] = $row;
			}
			
			return $data;
		}
		
		public function getALLBags(string $bt, string $rh): array
		{
			$sql = "SELECT *
					FROM blood_bag 
					WHERE Status_ = 'O'
					AND BBlood_Group = '$bt'
					AND BRh_Factor = '$rh'
					AND Bag_ID NOT IN 
					(SELECT BBag_ID
					FROM receive)";
					
			$stmt = $this->conn->query($sql);
			
			$data = [];
			
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$data[] = $row;
			}
			
			return $data;
		}
		
		public function getAReports($reportName, $interval): array
		{
			$sql1 = "SELECT s.CName, s.Scheduled_Date, s.Blood_BQuantity, p.National_ID,
						p.FName, p.LName, p.Blood_Group, p.Rh_Factor, b.Bag_ID,
						b.Donation_Date, b.Volume, b.Price  
					FROM donate AS d 
					JOIN donation_location AS s ON d.DSession_ID = s.Session_ID
					JOIN person AS p ON d.PNational_ID = p.National_ID
					JOIN blood_bag AS b ON d.BBag_ID = b.Bag_ID
					WHERE DATEDIFF(CURDATE(), b.Donation_Date) < '$interval'";
					
			$sql2 = "SELECT BBlood_Group, BRh_Factor, COUNT(Bag_ID) as quantity
					FROM blood_bag
					WHERE Status_ = 'O'
					GROUP BY BBlood_Group, BRh_Factor";
					
			$sql3 = "SELECT *
					FROM donation_location 
					WHERE DType = 'D'";
					
			$sql4 = "SELECT *
					FROM receive 
					WHERE Payment_Conf = '1'";
			
			switch ($reportName)
			{
				case "blooddonation":
					$sql = $sql1;
					break;
				case "bloodstock":
					$sql = $sql2;
					break;
				case "collectiondrive":
					$sql = $sql3;
					break;
				case "payments":
					$sql = $sql4;
					break;
				default:
					$sql = $sql1;
			}
			
			$stmt = $this->conn->query($sql);
			
			$data = [];
			
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$data[] = $row;
			}
			
			return $data;
		}
		
		public function getCommInfo(string $national_ID): array
		{
			$sql = "SELECT E_mail, Phone
					FROM person
					WHERE National_ID = $national_ID";
					
			$stmt = $this->conn->prepare($sql);
			
			$stmt->execute();
			
			$data = $stmt->fetch(PDO::FETCH_ASSOC);
						
			return $data;
		}
		
		public function postInfo(string $fun, array $data): array
		{
			$sql = "$fun INTO person
					VALUES ('$data[0]', '$data[1]', $data[2], '$data[3]', '$data[4]', '$data[5]',
					'$data[6]', '$data[7]', '$data[8]', '$data[9]', $data[10], $data[11],
					$data[12], $data[13], '$data[14]', '$data[15]', '$data[16]', $data[17],
					'$data[18]', '$data[19]')";
					
			$stmt = $this->conn->prepare($sql);
			
			$stmt->execute();
			
			$data = $stmt->fetch(PDO::FETCH_ASSOC);
			
			if(!$data)
			{
				$data = ["Success", $stmt->rowCount()];
			}
			
			return $data;
		}
		
		public function postReceive(string $national_ID, string $bbag_ID): array
		{
			$sql = "INSERT INTO receive
					VALUES ('$national_ID', '$bbag_ID', '0')";
					
			$stmt = $this->conn->prepare($sql);
			
			$stmt->execute();
			
			$data = $stmt->fetch(PDO::FETCH_ASSOC);
			
			if(!$data)
			{
				$data = ["Success", $stmt->rowCount()];
			}
			
			return $data;
		}
		
		public function postDrive(string $date): array
		{
			$sql = "INSERT INTO donation_location (DType, Scheduled_Date, Blood_BQuantity)
					VALUES ('D', '$date', null)";
					
			$stmt = $this->conn->prepare($sql);
			
			$stmt->execute();
			
			$data = $stmt->fetch(PDO::FETCH_ASSOC);
			
			if(!$data)
			{
				$data = ["Success", $stmt->rowCount()];
			}
			
			return $data;
		}
		
		public function postDriveQuantity(string $session_ID, string $quantity): array
		{
			$sql = "UPADTE donation_location 
					SET Blood_BQuantity = $quantity
					WHERE Session_ID = $session_ID";
					
			$stmt = $this->conn->prepare($sql);
			
			$stmt->execute();
			
			$data = $stmt->fetch(PDO::FETCH_ASSOC);
			
			if(!$data)
			{
				$data = ["Success", $stmt->rowCount()];
			}
			
			return $data;
		}
		
		public function deleteInfo(string $national_ID): array
		{
			$sql = "DELETE FROM person
					WHERE National_ID = '$national_ID'";
					
			$stmt = $this->conn->prepare($sql);
			
			$stmt->execute();
			
			$data = $stmt->fetch(PDO::FETCH_ASSOC);
			
			if(!$data)
			{
				$data = ["Success", $stmt->rowCount()];
			}
			
			return $data;
		}
	}
?>