<?php
	class BloodTypeController
	{
		public function __construct(private BloodTypeGateway $gateway)
		{
			
		}
		public function processRequest(string $method, ?string $isdonateG, ?string $body0, ?string $body1): void
		{
			switch($method)
			{
				case "GET": 
					if(($isdonateG == "1") or ($isdonateG == "0")) 
					{
						$this->processRequestSingle($isdonateG, $body0, $body1);
						break;
					}
					elseif ($isdonateG == null) 
					{
						$this->processRequestCollection();
						break;
					}
					else
					{
						http_response_code(400);
					}
				case "OPTIONS":
					break;
				default:
					http_response_code(405);
					header("Allow: GET");
			}
		}
		public function processRequestSingle(string $isdonateG, string $bg, string $rh): void
		{
			if($isdonateG == "1")
			{
				$table = "donate_group";
			}
			else
			{
				$table = "recipient_group";
			}
			
			/*$raw = file_get_contents("php://input");
			$data = (array) json_decode(preg_replace("/^\'|\'$/", "", $raw), true);
            $errors = $this->getValidation($data, false);
                
            if(!empty($errors)) 
			{
                http_response_code(422);
                echo json_encode(["errors" => $errors]);
				return;
            } */
			
			$request = $this->gateway->get($table, $bg, $rh);
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($request);
		}
		public function processRequestCollection(): void
		{
			$donate_group = $this->gateway->getAll("donate_group");
			$receive_group = $this->gateway->getAll("recipient_group");
			
			echo json_encode(["Donate_Group" => $donate_group, "Recipient_Group" => $receive_group]);
		}
		private function errorValidation(array $data, bool $is_new = true): array
		{
			$errors = [];
			
			return $errors;
		}
	}
?>