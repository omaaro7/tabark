<?php
// Database connection parameters
$host = '127.0.0.1';
$username = 'root';
$password = ''; // Assuming password is empty for root
$database = 'tabark';

// Connect to MySQL database
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get parameters from the client
$client_number = $_GET['client_number']; // Assuming client_number is passed as a GET parameter
$operation_type = $_GET['operationType']; // Assuming operation_type is passed as a GET parameter

// Prepare SQL query
$sql = "SELECT * FROM operations WHERE client_number = ? AND CAST(baky AS UNSIGNED) > 0 AND operationType = ?";
$stmt = $conn->prepare($sql);

// Bind parameters
$stmt->bind_param("ss", $client_number, $operation_type);

// Execute query
$stmt->execute();

// Get result
$result = $stmt->get_result();

// Fetch data as associative array
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Close statement
$stmt->close();

// Close connection
$conn->close();

// Return data as JSON
echo json_encode($data);
?>
