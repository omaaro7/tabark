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

// Get operationType from GET request
$operationType = $_GET['operationType'];

// SQL query to fetch data based on operationType
$sql = "SELECT * FROM operations WHERE operationType = '$operationType'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Fetching data row by row
    $data = array();
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // Sending JSON response
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    // Sending error response if no data found
    echo "No data found";
}

// Close connection
$conn->close();

?>
