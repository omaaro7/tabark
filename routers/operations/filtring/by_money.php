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

// API endpoint to get data by money
function getDataByMoney($money) {
    global $conn;

    // SQL query to fetch data based on money
    $sql = "SELECT * FROM operations WHERE money = '$money'";
    $result = $conn->query($sql);

        // Fetching data row by row
        $data = array();
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        // Sending JSON response
        header('Content-Type: application/json');
        echo json_encode($data);

}

// Check if money parameter is set in GET request
if(isset($_GET['money'])) {
    $money = $_GET['money'];
    getDataByMoney($money);
} else {
    echo "Please provide money parameter";
}

// Close connection
$conn->close();

?>
