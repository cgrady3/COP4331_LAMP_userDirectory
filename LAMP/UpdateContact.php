<?php
	$inData = getRequestInfo();

	// include database connection file
	include_once "dbConfig.php";
		
	$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Email=?, Phone=? WHERE ContactID=? AND UserID=?");
	$stmt->bind_param("ssssss", $inData["FirstName", "LastName", "Email", "Phone", "ContactID", "UserID"]);
	$stmt->execute();
	returnWithError($stmt->affected_rows);
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
