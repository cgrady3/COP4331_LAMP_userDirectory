<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();
		
	$stmt = $conn->prepare("SELECT * FROM Users WHERE Email=?");
	$stmt->bind_param("s", $inData["Email"]);
	$stmt->execute();

	$result = $stmt->get_result();

	if ($result->num_rows > 0){
		returnWithError("User Email Already Registered");
	}
	else if ($inData["Password"] == ""){
		$stmt = $conn->prepare("UPDATE Users SET FirstName=?, LastName=?, Email=? WHERE UserID=?");
		$stmt->bind_param("ssss", $inData["FirstName"], $inData["LastName"], $inData["Email"], $inData["UserID"]);
		$stmt->execute();
	}
	else{
		$stmt = $conn->prepare("UPDATE Users SET FirstName=?, LastName=?, Email=?, Password=? WHERE UserID=?");
		$stmt->bind_param("sssss", $inData["FirstName"], $inData["LastName"], $inData["Email"], $inData["Password"], $inData["UserID"]);
		$stmt->execute();
	}
	
	returnWithInfo($stmt->affected_rows);

	$stmt->close();
	$conn->close();
?>
