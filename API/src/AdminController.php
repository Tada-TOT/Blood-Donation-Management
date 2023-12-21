<?php
	class AdminController
	{
		public function __construct(private AdminGateway $gateway)
		{
			
		}
		public function processRequest(string $method, ?string $function, ?string $userType, ?string $rType, ?string $postType, ?string $body0, ?string $body1): void
		{
			switch($method)
			{
				case "GET": 
					if($function == "info") 
					{
						$this->processRequestInfo($userType);
						break;
					}
					elseif ($function == "searchsinglehistory")
					{
						$this->processRequestSearchSingleHistory($body0);
						break;
					}
					elseif ($function == "searchbloodbags")
					{
						$this->processRequestSearchBloodBags($body0, $body1);
						break;
					}
					elseif ($function == "reports")
					{
						$this->processRequestReports($rType, $body0);
						break;
					}
					elseif ($function == "commuinfo")
					{
						$this->processRequestCommuInfo($body0);
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
						$this->processModifyInfo($postType);
						break;
					}
					elseif ($function == "assignbagtorecipient")
					{
						$this->processRequestBagToRecipient();
						break;
					}
					elseif ($function == "scheduledrive")
					{
						$this->processRequestDrive();
						break;
					}
					elseif ($function == "scheduledriveQuantity")
					{
						$this->processUpdateDrive();
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
		public function processRequestInfo(string $userType): void
		{
			$request = null;
			/*$data = (array) json_decode(file_get_contents("php://input"), true);
			$errors = $this->getValidation($data, false);
			if(!empty($errors)) 
			{
                http_response_code(422);
                echo json_encode(["errors" => $errors]);
				return;
            } */
			
			if($userType == "d")
			{
				$request = $this->gateway->getALLPDRU("DFlag");
			}
			elseif ($userType == "r")
			{
				$request = $this->gateway->getALLPDRU("RFlag");
			}
			elseif ($userType == "u")
			{
				$request = $this->gateway->getALLPDRU("EFlag");
			}
			elseif ($userType == "a")
			{
				$request = $this->gateway->getALLPDRU("ALL");
			}
			else
			{
				http_response_code(405);
				header("Allow: Donor(d), Recipient(r), User(u)");
				return;
			}
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($request);
		}
		
		public function processRequestSearchSingleHistory(string $nationa_ID): void
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
			
			$requestD = $this->gateway->getHistory("donate", $nationa_ID);
			$requestR = $this->gateway->getHistory("receive", $nationa_ID);
			
			if (!($requestD or $requestR)) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode(["Donating" => $requestD, "Receving" => $requestR]);
		}
		
		public function processRequestSearchBloodBags(string $bg, string $rh): void
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
			
			$request = $this->gateway->getALLBags($bg, $rh);
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($request);
		}
		
		public function processRequestReports(string $reportType, string $interval): void
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
			
			$request = $this->gateway->getAReports($reportType, $interval);
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($request);
		}
		
		public function processRequestCommuInfo(string $national_ID): void
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
			
			$request = $this->gateway->getCommInfo($national_ID);
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($request);
		}
		
		public function processModifyInfo(string $postType): void
		{
			$request = null;
			$raw = file_get_contents("php://input");
			$data = (array) json_decode(preg_replace("/^\'|\'$/", "", $raw), true);
			/*$errors = $this->getValidation($data, false);
			if(!empty($errors)) 
			{
                http_response_code(422);
                echo json_encode(["errors" => $errors]);
				return;
            } */
			
			if($postType == "e")
			{
				$request = $this->gateway->postInfo("REPLACE", $data);
			}
			elseif ($postType == "a")
			{
				$request = $this->gateway->postInfo("INSERT", $data);
			}
			else
			{
				http_response_code(405);
				header("Allow: EDIT(e), ADD(a)");
				return;
			}
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($request);
		}
		
		public function processRequestBagToRecipient(): void
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
			
			$request = $this->gateway->postReceive($data[0], $data[1]);
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($request);
		} 
		
		public function processRequestDrive(): void
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
			
			$request = $this->gateway->postDrive($data[0]);
			
			if (!$request) 
			{
				http_response_code(404);
				return;
			}
			
			echo json_encode($request);
		} 
		
		public function processUpdateDrive(): void
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
			
			$request = $this->gateway->postDriveQuantity($data[0], $data[1]);
			
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