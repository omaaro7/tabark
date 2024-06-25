<?php

// Establish database connection
$servername = "127.0.0.1";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$database = "tabark"; // Your MySQL database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get client_number from GET request
$client_number = $_GET['client_number'];

// SQL query to fetch data based on client_number
$sql = "SELECT * FROM operations WHERE client_number = $client_number";

$result = $conn->query($sql);
    // Fetching data row by row
    $data = array();
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // Sending JSON response
    header('Content-Type: application/json');
    echo json_encode($data);

// Close connection
$conn->close();

?>
