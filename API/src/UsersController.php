<?php
	class UsersController
	{
		public function __construct(private UsersGateway $gateway)
		{
			
		}
		public function processRequest(string $method, ?string $function, ?string $body0): void
		{
			switch($method)
			{
				case "GET": 
					if($function == "info") 
					{
						$this->processRequestInfo($body0);
						break;
					}
					elseif ($function == "searcehistory")
					{
						$this->processRequestSearchHistory($body0);
						break;
					}
					elseif ($function == "unpaidreq")
					{
						$this->processRequestUnpaid($body0);
						break;
					}
					elseif ($function == "ebaglocation")
					{
						$this->processRequestEmpBagLoc($body0);
						break;
					}
					else
					{
						http_response_code(400);
						break;
					}
				case "POST" :
					if($function == "info") 
					{
						$this->processModifyInfo();
						break;
					}
					elseif ($function == "paymentconfirmed")
					{
						$this->processConfirmPayment();
						break;
					}
					elseif ($function == "donation")
					{
						$this->processDonation());
						break;
					}
					else
					{
						http_response_code(400);
						break;
					}	
				case "DELETE" :
					if($function == "info") 
					{
						$this->processRemoveInfo();
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
					header("Allow: GET, POST, DELETE");
			}
		}
		public function processRequestInfo(string $national_ID): void
		{
			/*$raw = file_get_contents("php://input");
			$data = (array) json_decode(preg_replace("/^\'|\'$/", "", $raw), true);
			$errors = $this->getValidation($data, false);
			if(!empty($errors)) 
			{
                http_response_code(422);
                echo json_encode(["errors" => $errors]);
				return;
            } */
			
			$request = $this->gateway->get($national_ID);
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($request);
		}
		
		public function processRequestSearchHistory(string $national_ID): void
		{
			/*$raw = file_get_contents("php://input");
			$data = (array) json_decode(preg_replace("/^\'|\'$/", "", $raw), true);
			$errors = $this->getValidation($data, false);
			if(!empty($errors)) 
			{
                http_response_code(422);
                echo json_encode(["errors" => $errors]);
				return;
            } */
			
			$requestD = $this->gateway->getHistory("donate", $national_ID);
			$requestR = $this->gateway->getHistory("receive", $national_ID);
			
			if (!$requestR or !$requestD) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode(["Donating" => $requestD, "Receving" => $requestR]);
		}
		
		public function processRequestUnpaid(string $national_ID): void
		{
			/*$raw = file_get_contents("php://input");
			$data = (array) json_decode(preg_replace("/^\'|\'$/", "", $raw), true);
			$errors = $this->getValidation($data, false);
			if(!empty($errors)) 
			{
                http_response_code(422);
                echo json_encode(["errors" => $errors]);
				return;
            } */
			
			$request = $this->gateway->getUnpaid($national_ID);
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($request);
		}
		
		public function processRequestEmpBagLoc(string $bag_ID): void
		{
			/*$raw = file_get_contents("php://input");
			$data = (array) json_decode(preg_replace("/^\'|\'$/", "", $raw), true);
			/*$errors = $this->getValidation($data, false);
			if(!empty($errors)) 
			{
                http_response_code(422);
                echo json_encode(["errors" => $errors]);
				return;
            } */
			
			$request = $this->gateway->getBagLoc($bag_ID);
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($request);
		}
		
		public function processModifyInfo(): void
		{
			$raw = file_get_contents("php://input");
			$data = (array) json_decode(preg_replace("/^\'|\'$/", "", $raw), true);
			/*$errors = $this->getValidation($data, false);
			if(!empty($errors)) 
			{
                http_response_code(422);
                echo json_encode(["errors" => $errors]);
				return;
            } */
			
			$request = $this->gateway->postInfo("REPLACE", $data);
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($data);
		}
		
		public function processConfirmPayment(): void
		{
			$raw = file_get_contents("php://input");
			$data = (array) json_decode(preg_replace("/^\'|\'$/", "", $raw), true);
			/*$errors = $this->getValidation($data, false);
			if(!empty($errors)) 
			{
                http_response_code(422);
                echo json_encode(["errors" => $errors]);
				return;
            } */
			
			$request = $this->gateway->postPay($data[0], $data[1]);
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($request);
		} 
		
		public function processDonation(): void
		{
			$raw = file_get_contents("php://input");
			$data = (array) json_decode(preg_replace("/^\'|\'$/", "", $raw), true);
			/*$errors = $this->getValidation($data, false);
			if(!empty($errors)) 
			{
                http_response_code(422);
                echo json_encode(["errors" => $errors]);
				return;
            } */
			
			$request = $this->gateway->postDonation($data[0], $data[1], $data[2]);
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($request);
		} 
		
		public function processRemoveInfo(): void
		{
			$raw = file_get_contents("php://input");
			$data = (array) json_decode(preg_replace("/^\'|\'$/", "", $raw), true);
			/*$errors = $this->getValidation($data, false);
			if(!empty($errors)) 
			{
                http_response_code(422);
                echo json_encode(["errors" => $errors]);
				return;
            } */
			
			$request = $this->gateway->deleteInfo($data[0]);
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($request);
		}
		
		private function errorValidation(array $data, bool $is_new = true): array
		{
			$errors = [];
			
			return $errors;
		}
	}
?>