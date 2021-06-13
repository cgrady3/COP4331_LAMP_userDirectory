<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID=?");
	$stmt->bind_param("s", $inData["UserID"]);
	$stmt->execute();

	$row = $stmt->get_result();
	returnWithInfo($row->fetch_assoc());

	$stmt->close();
	$conn->close();
?>