<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM Users WHERE UserID=?");
	$stmt->bind_param("s", $inData["UserID"]);
	$stmt->execute();

	$user = $stmt->get_result()
	echo encode_json($user);

	$stmt->close();
	$conn->close();
?>