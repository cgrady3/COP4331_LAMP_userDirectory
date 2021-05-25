<?php
	$inData = getRequestInfo();

	$firstName = "";
	$lastName = "";
	$email = "";
	$phone = "";

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (FirstName,LastName,Email,Phone) VALUES(?,?,?,?)");
		$stmt->bind_param("ss", $inData["firstName"], $inData["lastName"], $inData["email"], $inData["phone"]);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError($inData["firstName"]. $inData["lastName"]. $inData["email"] . $inData["phone"]);
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
