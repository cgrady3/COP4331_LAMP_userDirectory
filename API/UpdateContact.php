<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();
		
	$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Email=?, Phone=?, FullName=?, Notes=?, WHERE ContactID=? AND UserID=?");
	$stmt->bind_param("ssssssss", $inData["FirstName"], $inData["LastName"], $inData["Email"], $inData["Phone"], $inData["FullName"], $inData["Notes"], $inData["ContactID"], $inData["UserID"]);

	$stmt->execute();

	returnWithInfo($stmt->affected_rows);

	$stmt->close();
	$conn->close();
?>
