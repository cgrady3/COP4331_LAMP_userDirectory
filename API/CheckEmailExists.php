<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM Users WHERE Email=?");
	$stmt->bind_param("s", $inData["Email"]);
	$stmt->execute();

	$result = $stmt->get_result();
	echo json_encode($result->fetch_assoc());

	$stmt->close();
	$conn->close();
?>
