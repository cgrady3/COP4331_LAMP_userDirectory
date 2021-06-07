<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();
 
	$stmt = $conn->prepare("SELECT * FROM Contacts WHERE FirstName LIKE ? OR LastName LIKE ? AND UserID=?");
	$name = $inData["search"] . "%";
	$stmt->bind_param("sss", $name, $name, $inData["UserID"]);
	$stmt->execute();

	$result = $stmt->get_result();		

  	if ($result->num_rows > 0) {
		returnWithInfo($result->fetch_assoc());
  	}
    else {
		returnWithError("No Contact Found");
  	}

	$stmt->close();
	$conn->close();
?>
