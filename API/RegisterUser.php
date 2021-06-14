<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT Email FROM Users WHERE Email=?");
	$stmt->bind_param("s", $inData["Email"]);
	$stmt->execute();

	$result = $stmt->get_result();

	if ($result->num_rows > 0){
		returnWithError("User Already Exists");
	}
	else{
		$stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Email, Password) VALUES(?, ?, ?, ?)");
		$stmt->bind_param("ssss", $inData["FirstName"], $inData["LastName"], $inData["Email"], $inData["Password"]);
		$stmt->execute();
		
		returnWithInfo($stmt->fetch_assoc());
	}
	
	$stmt->close();
	$conn->close();
?>