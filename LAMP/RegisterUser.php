<?php
	$inData = getRequestInfo();

	// include database connection file
	include_once "dbConfig.php";

	function registerUser()
	{
		$stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Email, Password) VALUES(?, ?, ?, ?)");
		$stmt->bind_param("ssss", $inData->FirstName, $inData->LastName, $inData->Email, $inData->Password);
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