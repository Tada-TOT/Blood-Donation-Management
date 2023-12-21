<?php

	class UsersGateway
	{
		private PDO $conn;
		
		public function __construct(DataBase $database)
		{
			$this->conn = $database->connection();
			
			if(! $this->conn){
				echo("Error: MySQL Server Connection Failed!");
			}
		}
		
		public function get(string $id): array
		{
			$sql = "SELECT *
					FROM person
					WHERE National_ID = '$id'";
					
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
		
		public function getUnpaid(string $national_ID): array
		{
			$sql = "SELECT Bag_ID, Donation_Date, Volume, Price, BBlood_Group, BRh_Factor
					FROM receive AS r 
					JOIN blood_bag AS bb
					ON r.BBag_ID = bb.Bag_ID
					WHERE r.PNational_ID = $national_ID
					AND r.Payment_Conf = '0'";
					
			$stmt = $this->conn->query($sql);
			
			$data = [];
			
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$data[] = $row;
			}
			
			return $data;
		}
		
		public function getBagLoc(string $Bag_ID): array
		{
			$sql = "SELECT *
					FROM blood_bag 
					WHERE Bag_ID = $Bag_ID";
					
			$stmt = $this->conn->query($sql);
			
			$data = [];
			
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$data[] = $row;
			}
			
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
		
		public function postPay(string $national_ID, string $bbag_id): array
		{
			$sql = "UPDATE receive
					SET Payment_Conf = '1'
					WHERE PNationa_ID = '$national_ID'
					AND BBag_ID = '$bbag_id'";
					
			$stmt = $this->conn->prepare($sql);
			
			$stmt->execute();
			
			$data = $stmt->fetch(PDO::FETCH_ASSOC);
			
			if(!$data)
			{
				$data = ["Success", $stmt->rowCount()];
			}
			
			return $data;
		}
		
		public function postDonation(string $national_ID, string $bbag_id, string $session): array
		{
			$sql = "INSERT INTO donate
					VALUES ($national_ID, $bbag_id, $session";
					
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