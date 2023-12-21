<?php
	class LoginController
	{
		public function __construct(private LoginGateway $gateway)
		{
			
		}
		public function processRequest(string $method, ?string $login): void
		{
			switch($method)
			{
				case "POST": 
					if($login == "login") 
					{
						$this->processRequestCheck();
						break;
					}
					elseif($login == "unique")
					{
						$this->processRequestUnique();
						break;
					}
					else 
					{
						http_response_code(400);
						break;
					}
				case "OPTIONS":
					break;
				default:
					http_response_code(405);
					header("Allow: POST");
			}
		}
		public function processRequestCheck(): void
		{
			$raw = file_get_contents("php://input");
			$data = (array) json_decode(preg_replace("/^\'|\'$/", "", $raw), true);
            /*$errors = $this->errorValidation($data, false);
                
            if(!empty($errors)) 
			{
                http_response_code(422);
                echo json_encode(["errors" => $errors]);
				return;
            } */
			
			$check = $this->gateway->postAll("person", $data[0], $data[1]);
			
			if (!$check) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($check);
		}
		public function processRequestUnique(): void
		{
			$raw = file_get_contents("php://input");
			$username = (array) json_decode(preg_replace("/^\'|\'$/", "", $raw), true);
            //$errors = $this->errorValidation($username, false);
                
            /* if(!empty($errors)) 
			{
                http_response_code(422);
                echo json_encode(["errors" => $errors]);
				return;
            } */
			
			$check = $this->gateway->post("person", $username[0]);
		
			if (!$check) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($check);
		}
		private function errorValidation(array $data, bool $is_new = true): array
		{
			$errors = [];
			
			return $errors;
		}
	}
?>