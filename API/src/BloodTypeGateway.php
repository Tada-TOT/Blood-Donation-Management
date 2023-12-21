<?php

	class BloodTypeGateway
	{
		private PDO $conn;
		
		public function __construct(DataBase $database)
		{
			$this->conn = $database->connection();
			
			if(! $this->conn){
				echo("Error: MySQL Server Connection Failed!");
			}
		}
		public function getAll(string $table): array
		{
			$sql = "SELECT *
					FROM $table";
					
			$stmt = $this->conn->query($sql);
			
			$data = [];
			
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$data[] = $row;
			}
			
			return $data;
		}
		public function get(string $table, string $bGroup, string $bRh): array | false
		{
			$sql = "SELECT *
					FROM $table
					WHERE BBlood_Group = '$bGroup'
					AND BRh_Factor = '$bRh'";
					
			$stmt = $this->conn->prepare($sql);
			
			$stmt->execute();
			
			$data = [];
			
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$data[] = $row;
			}
						
			return $data;
		}
	}
?>