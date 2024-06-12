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

// API endpoint to get data by dateDay
function getDataByDateDay($dateDay) {
    global $conn;

    // Sanitize input to prevent SQL injection
    $dateDay = $conn->real_escape_string($dateDay);

    // SQL query to fetch data based on dateDay
    $sql = "SELECT * FROM operations WHERE dateDay = '$dateDay'";
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

// Check if dateDay parameter is set in GET request
if(isset($_GET['dateDay'])) {
    $dateDay = $_GET['dateDay'];
    getDataByDateDay($dateDay);
} else {
    echo "Please provide dateDay parameter";
}

// Close connection
$conn->close();

?>
