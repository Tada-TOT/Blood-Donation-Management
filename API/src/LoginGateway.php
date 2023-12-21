<?php

	class LoginGateway
	{
		private PDO $conn;
		
		public function __construct(DataBase $database)
		{
			$this->conn = $database->connection();
			
			if(! $this->conn){
				echo("Error: MySQL Server Connection Failed!");
			}
		}
		public function postAll(string $table, string $username, string $password): array
		{
			$sql = "SELECT username, password_, National_ID, DFlag, RFlag, EFlag, is_Admin
					FROM $table
					WHERE username = '$username'";
					
			$stmt = $this->conn->query($sql);
			
			$data = $stmt->fetch(PDO::FETCH_ASSOC);
			
			if($data)
			{
				if(($data["username"] == $username) and ($data["password_"] == $password))
				{
					$data = array_slice($data, 2);
				}
				else 
				{
					$data = ["Wrong Password"];
				}
			}
			else 
			{
				$data = ["Wrong Username"];
			}
			
			return $data;
		}
		public function post(string $table, string $username): array
		{
			$sql = "SELECT username
					FROM $table
					WHERE username = '$username'";
					
			$stmt = $this->conn->prepare($sql);
			
			$stmt->execute();
			
			$data = $stmt->fetch(PDO::FETCH_ASSOC);
			
			if($data)
			{
				return ["Exist"];
			}
			else 
			{
				return ["Unique"];
			}
		}
	}
?>