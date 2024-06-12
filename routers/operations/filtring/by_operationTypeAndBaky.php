<?php

// Database connection parameters
$servername = "127.0.0.1";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$database = "tabark"; // Your MySQL database name

// Create database connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// API endpoint to get data by operationType and baky
function getDataByOperationTypeAndBaky($operationType, $baky) {
    global $conn;

    // Sanitize input to prevent SQL injection
    $operationType = $conn->real_escape_string($operationType);
    $baky = $conn->real_escape_string($baky);

    // SQL query to fetch data based on operationType and baky
    $sql = "SELECT * FROM operations WHERE operationType = '$operationType' AND baky = '$baky'";
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
}

// Check if operationType and baky parameters are set in GET request
if(isset($_GET['operationType']) && isset($_GET['baky'])) {
    $operationType = $_GET['operationType'];
    $baky = $_GET['baky'];
    getDataByOperationTypeAndBaky($operationType, $baky);
} else {
    echo "Please provide both operationType and baky parameters";
}

// Close connection
$conn->close();

?>
