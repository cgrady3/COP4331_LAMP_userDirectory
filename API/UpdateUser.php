<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();
		
	$stmt = $conn->prepare("SELECT * FROM Users WHERE Email=?");
	$stmt->bind_param("s", $inData["Email"]);
	$stmt->execute();

	$result = $stmt->get_result();
	// check if email was updated but already exists in database
	if (!strcmp($inData["Email"], "false") && $result->num_rows > 0){
		returnWithError("User Email Already Registered");
	}
	//check if password was updated by email wasnt
	else if (!strcmp($inData["Password"], "false") && strcmp($inData["Email"], "false")){
		$stmt = $conn->prepare("UPDATE Users SET FirstName=?, LastName=?, Password=? WHERE UserID=?");
		$stmt->bind_param("ssss", $inData["FirstName"], $inData["LastName"], $inData["Password"], $inData["UserID"]);
		$stmt->execute();
		returnWithInfo($stmt->affected_rows);
	}
	// check if email was updated but password wasnt
	else if (strcmp($inData["Password"], "false") && !strcmp($inData["Email"], "false")){
		$stmt = $conn->prepare("UPDATE Users SET FirstName=?, LastName=?, Email=? WHERE UserID=?");
		$stmt->bind_param("ssss", $inData["FirstName"], $inData["LastName"], $inData["Email"], $inData["UserID"]);
		$stmt->execute();
		returnWithInfo($stmt->affected_rows);
	}
	// if both were updated
	else{
		$stmt = $conn->prepare("UPDATE Users SET FirstName=?, LastName=?, Email=?, Password=? WHERE UserID=?");
		$stmt->bind_param("sssss", $inData["FirstName"], $inData["LastName"], $inData["Email"], $inData["Password"], $inData["UserID"]);
		$stmt->execute();
		returnWithInfo($stmt->affected_rows);
	}
	
	$stmt->close();
	$conn->close();
?>
