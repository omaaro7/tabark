<?php

// Step 1: Establish a connection to your database
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "tabark";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Step 2: Write a PHP script to query the database and fetch the required data
$sql = "SELECT * FROM operations WHERE operationType = ? AND CAST(baky AS UNSIGNED) > 0";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Error in preparing statement: " . $conn->error);
}

// Assuming you're passing operationType as a parameter
$operationType = $_GET['operationType']; // Assuming you're passing it via GET request

$stmt->bind_param("s", $operationType);
$stmt->execute();

$result = $stmt->get_result();

// Step 3: Convert the `baky` column from text to a number for comparison
$data = array();
while ($row = $result->fetch_assoc()) {
    $row['baky'] = (float)$row['baky']; // Convert text to number
    $data[] = $row;
}

// Step 4: Return the data in JSON format
header('Content-Type: application/json');
echo json_encode($data);

// Close statement and connection
$stmt->close();
$conn->close();
?>
