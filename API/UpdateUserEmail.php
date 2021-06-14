<?php
    // include database connection file
    include "dbConfig.php";
    include "returnFunctions.php";

    $inData = getRequestInfo();

    $stmt = $conn->prepare("SELECT * FROM Users WHERE Email=?");
    $stmt->bind_param("s", $inData["Email"]);
    $stmt->execute();

    $result = $stmt->get_result();
    $num = $stmt->affected_rows;

    if ($num == 0){
        $stmt = $conn->prepare("UPDATE Users SET Email=? WHERE UserID=?");
        $stmt->bind_param("ss", $inData["Email"], $inData["UserID"]);

        $stmt->execute();

        echo json_encode($stmt->affected_rows);
    } else {
        echo json_encode(-1);
    }
    $stmt->close();
    $conn->close();
?>
