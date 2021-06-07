<?php
	// config db 
	$dbHost     = "localhost"; 
	$dbUsername = "TheBeast"; 
	$dbPassword = "WeLoveCOP4331"; 
	$dbName     = "COP4331"; 
	 
	// establish db connection 
	$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName); 
	 
	// Check connection 
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
?>