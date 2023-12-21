<?php
	class Database
	{
		private string $user= "root";
		private string $password= "a0553177350";
		public function __construct(private string $host, private string $name)
		{
			//$user = "root";
			//$password = "a0553177350";
		}
		public function connection(): PDO
		{
			$dsn = "mysql:host={$this->host};dbname={$this->name};charset=utf8";
			
			return new PDO($dsn, $this->user, $this->password, 
			[	
				PDO::ATTR_EMULATE_PREPARES => false,
				PDO::ATTR_STRINGIFY_FETCHES => false
			]);
		}
	}
?>