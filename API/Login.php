<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT UserID FROM Users WHERE Email=? AND Password=?");
	$stmt->bind_param("ss", $inData["Email"], $inData["Password"]);
	$stmt->execute();

	$result = $stmt->get_result();
	$row = $result->fetch_assoc();

	if(!is_null($row))
	{
		returnWithInfo( $row['UserID'] );
	}
	else
	{
		returnWithError("User Name / Password do not match OR user does not exist");
	}

	$stmt->close();
	$conn->close();


?>
