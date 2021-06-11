<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM Contacts WHERE (FirstName LIKE ? OR LastName LIKE ? OR Phone LIKE ? OR Email LIKE ? OR FullName LIKE ?) AND UserID=?");
	$search = "%". $inData["search"] . "%";
	$stmt->bind_param("ssssss", $search, $search, $search, $search, $search, $inData["UserID"]);
	$stmt->execute();

	$result = $stmt->get_result();
	$rows = array();

  	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()){
			$rows[] = $row;
		}
		echo json_encode($rows);
  	}
    else {
		returnWithError("No Contact Found");
  	}

	$stmt->close();
	$conn->close();
?>
