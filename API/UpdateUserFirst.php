<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("UPDATE Users SET FirstName=? WHERE UserID=?");
	$stmt->bind_param("ss", $inData["FirstName"], $inData["UserID"]);

	$stmt->execute();

	returnWithInfo($stmt->affected_rows);

	$stmt->close();
	$conn->close();
?>