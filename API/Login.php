<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	function loginUser()
	{
		$stmt = $conn->prepare("SELECT UserID FROM Users WHERE Email=? AND Password=?");
		$stmt->bind_param("ss", $inData["Email"], $inData["Password"]);
		$stmt->execute();

		$result = $stmt->get_result();

		if($row = $result->fetch_assoc())
		{
			returnWithInfo( $row['UserID'] );
		}
		else
		{
			returnWithError("User Not Found");
		}

		$stmt->close();
		$conn->close();
	}
?>
