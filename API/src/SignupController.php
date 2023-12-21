<?php
	class SignupController
	{
		public function __construct(private SignupGateway $gateway)
		{
			
		}
		public function processRequest(string $method, ?string $signup): void
		{
			switch($method)
			{
				case "POST": 
					if($signup == "signup") 
					{
						$this->processRequestPost();
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
		public function processRequestPost(): void
		{
			$raw = file_get_contents("php://input");
			$data = (array) json_decode(preg_replace("/^\'|\'$/", "", $raw), true);
            //$errors = $this->errorValidation($data, false);
                
            /* if(!empty($errors)) 
			{
                http_response_code(422);
                echo json_encode(["errors" => $errors]);
				return;
            } */
			
			$post = $this->gateway->postAll($data);
			
			if (!$post) 
			{
				http_response_code(406);
				return;
			}
			
			echo json_encode($post);
		}
		private function errorValidation(array $data, bool $is_new = true): array
		{
			$errors = [];
			
			return $errors;
		}
	}
?>