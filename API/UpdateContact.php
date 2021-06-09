<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();
		
	$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Email=?, Phone=? WHERE ContactID=? AND UserID=?");
	$stmt->bind_param("ssssss", $inData["FirstName"], $inData["LastName"], $inData["Email"], $inData["Phone"], $inData["ContactID"], $inData["UserID"]);
	$stmt->execute();

	returnWithInfo($stmt->affected_rows);

	$stmt->close();
	$conn->close();
?>