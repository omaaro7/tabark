<?php

// Database connection details
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "tabark";

// Create connection
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
// Set the PDO error mode to exception
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// API endpoint for getting data from the 'operations' table
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Extract operationType from the URL
    $operationType = isset($_GET['operationType']) ? $_GET['operationType'] : '';

    // Fetch data from the 'operations' table where 'baky' column > 0 and 'operationType' matches
    $query = "SELECT * FROM operations WHERE CAST(baky AS UNSIGNED) > 0 AND operationType = :operationType ORDER BY id DESC";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(':operationType', $operationType);
    $stmt->execute();

    // Fetch all rows as associative arrays
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the result as JSON
    header('Content-Type: application/json');
    echo json_encode($result);
} else {
    // Handle unsupported HTTP methods
    http_response_code(405);
    echo json_encode(array("message" => "Method Not Allowed"));
}

?>