<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("DELETE FROM Contacts WHERE UserID=? AND ContactID=?");
	$stmt->bind_param("ss", $inData["UserID"], $inData["ContactID"]);
	$stmt->execute();

	returnWithInfo($stmt->affected_rows);

	$stmt->close();
	$conn->close();
?>
