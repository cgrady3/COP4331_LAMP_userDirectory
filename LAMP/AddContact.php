<?php
	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("Insert into Contacts (FirstName, LastName, Email, Phone, UserID) VALUES(?, ?, ?, ?, ?)");
		$stmt->bind_param("ssssi", $inData["FirstName"], $inData["LastName"], $inData["Email"], $inData["Phone"], $inData["UserID"]);
		$stmt->execute();
		returnWithError($stmt->affected_rows);
		$stmt->close();
		$conn->close();

	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>