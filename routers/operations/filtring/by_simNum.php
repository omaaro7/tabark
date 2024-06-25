<?php

// Database connection parameters
$host = "127.0.0.1";
$username = "root";
$password = "";
$database = "tabark";

// Establish a connection to the database
$conn = mysqli_connect($host, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check if simCardNumber is provided in the URL
if (isset($_GET['simCardNumber'])) {
    $simCardNumber = $_GET['simCardNumber'];

    // Prepare SQL query
    $sql = "SELECT * FROM operations WHERE simCardNumber = '$simCardNumber'";

    // Execute SQL query
    $result = mysqli_query($conn, $sql);

    // Check if there are any results
        // Fetch data from the result set
        $operations = mysqli_fetch_all($result, MYSQLI_ASSOC);

        // Output data as JSON
        header('Content-Type: application/json');
        echo json_encode($operations);

} else {
    // simCardNumber parameter is missing in the URL
    echo json_encode(array("error" => "simCardNumber parameter is required"));
}

// Close the database connection
mysqli_close($conn);

?>
