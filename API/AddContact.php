<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();
	
	$stmt = $conn->prepare("SELECT * FROM Contacts WHERE FirstName=? AND LastName=? AND Email=? AND Phone=? AND UserID=?");
	$stmt->bind_param("ssssi", $inData["FirstName"], $inData["LastName"], $inData["Email"], $inData["Phone"], $inData["UserID"]);
	$stmt->execute();

	$result = $stmt->get_result();

	if ($result->num_rows > 0){
		returnWithError("Contact Already Exists");
	}
	else{
		$stmt = $conn->prepare("INSERT INTO Contacts (FirstName, LastName, Email, Phone, UserID) VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param("ssssi", $inData["FirstName"], $inData["LastName"], $inData["Email"], $inData["Phone"], $inData["UserID"]);
		$stmt->execute();

		returnWithInfo($stmt->affected_rows);
	}
	
	$stmt->close();
	$conn->close();
?>
