<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php"

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM Contacts WHERE ContactID=? AND UserID=?");
	$stmt->bind_param("ss", $inData["ContactID"], $inData["UserID"]);
	$stmt->execute();

	returnWithInfo($stmt->get_result());

	$stmt->close();
	$conn->close();
?>
