<?php

	$inData = getRequestInfo();

	$searchResult = "";

	// include database connection file
	include_once "dbConfig.php";

	$stmt = $conn->prepare("SELECT * FROM Contacts WHERE ContactID=? AND UserID=?");
	$stmt->bind_param("ss", $inData["ContactID", "UserID"]);
	$stmt->execute();

	returnWithInfo($stmt->get_result());

	$stmt->close();
	$conn->close();

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
		$retValue = '{"id":0,"FirstName":"","LastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
