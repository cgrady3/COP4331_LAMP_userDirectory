<?php

	$inData = getRequestInfo();

	// include database connection file
	include_once "dbConfig.php";
 

	$stmt = $conn->prepare("SELECT * FROM Contacts WHERE FirstName LIKE ? OR LastName LIKE ? AND UserID=?");
	$name = $inData["search"] . "%";
	$stmt->bind_param("sss", $name, $name, $inData["userId"]);
	$stmt->execute();

	$result = $stmt->get_result();

	$output .= '<ul class="list-unstyled">';		

  	if ($result->num_rows > 0) {
  		while ($row = $result->fetch_array()) {
  			$output .= '<li class="result" data-ID=' . $row["ContactID"] . '>' . ucwords($row["FirstName"] .  " " .  $row["LastName"]) . '</li>';
  		}
  	}
    else {
		$output .= '<li> Contact Not Found</li>';
  	}
  		
	$output .= '</ul>';
	echo $output;

	$stmt->close();
	$conn->close();
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"id":0,"FirstName":"","LastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
