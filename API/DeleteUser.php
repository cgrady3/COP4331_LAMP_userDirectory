<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("DELETE FROM Users WHERE UserID=?");
	$stmt->bind_param("s", $inData["UserID"]);
	$stmt->execute();

    $stmt = $conn->prepare("DELETE FROM Contacts WHERE UserID=?");
	$stmt->bind_param("s", $inData["UserID"]);
	$stmt->execute();

	returnWithInfo($stmt->affected_rows);

	$stmt->close();
	$conn->close();
?>