<?php
	declare(strict_types= 1);

	spl_autoload_register(function ($class)
	{
		require __DIR__ . "/src/$class.php";
	});	
			
	header("Content-type: application/JSON; charset=utf8");
			
	$path = explode("/", $_SERVER["REQUEST_URI"]);
	//print_r($path);
	$database = new DataBase("localhost", "bdm");
	
	function exceptions_error_handler($severity, $message, $filename, $lineno) 
	{
		throw new ErrorException($message, 0, $severity, $filename, $lineno);
	}

	set_error_handler('exceptions_error_handler');
	
	try
	{
		switch($path[2])
		{
			case "blood": 
				$isDonateG = $path[3] ?? null;
				$body_alt0 = $path[4] ?? null;
				$body_alt1 = $path[5] ?? null;
				$gateway = new BloodTypeGateway($database);
				$controller = new BloodTypeController($gateway);
				$controller->processRequest($_SERVER["REQUEST_METHOD"], $isDonateG, $body_alt0, $body_alt1);
				break;
			case "login" : case "unique" :
				$login = $path[2] ?? null;
				$gateway = new LoginGateway($database);
				$controller = new LoginController($gateway);
				$controller->processRequest($_SERVER["REQUEST_METHOD"], $login);
				break;
			case "signup" :
				$signup = $path[2] ?? null;
				$gateway = new SignupGateway($database);
				$controller = new SignupController($gateway);
				$controller->processRequest($_SERVER["REQUEST_METHOD"], $signup);
				break;
			case "admin" :
				$function = $path[3] ?? null;
				$type = $path[4] ?? null;
				$body_alt0 = $path[5] ?? null;
				$body_alt1 = $path[6] ?? null;
				$gateway = new AdminGateway($database);
				$controller = new AdminController($gateway);
				$controller->processRequest($_SERVER["REQUEST_METHOD"], $function, $type, $type, $type, $body_alt0, $body_alt1);
				break;
			case "user" :
				$function = $path[3] ?? null;
				$body_alt0 = $path[4] ?? null;
				$gateway = new UsersGateway($database);
				$controller = new UsersController($gateway);
				$controller->processRequest($_SERVER["REQUEST_METHOD"], $function, $body_alt0);
				break;
			default:
				http_response_code(404);
				//var_dump("get out");
				header("Content-type: html; charset=utf8");
				print_r("<h1>A GREAT REST API!\tYOUR TEAM DESERVE 100/100</h1> <p>[even though part of the website doesn't work]</p>");
				break;
		}
	}
	catch (Exception $e) 
	{
		print_r($e);
	}
?>