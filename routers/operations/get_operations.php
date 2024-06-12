<?php

$servername = "127.0.0.1"; // Change this to your server's hostname
$username = "root"; // Change this to your MySQL username
$password = ""; // Change this to your MySQL password
$database = "tabark"; // Change this to your database name

// Establish connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// If no specific action is specified, assume retrieving all data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if an ID is provided in the query string
    if (isset($_GET['id'])) {
        $id = $_GET['id']; // Assume the ID is passed as a query parameter

        $sql = "SELECT * FROM operations WHERE id = $id";
        $result = $conn->query($sql);

        $row = $result->fetch_assoc();
        echo json_encode($row);

    } else { // If no ID is provided, retrieve all data
        $sql = "SELECT * FROM operations ORDER BY id DESC"; // Ordering by 'id' column in descending order
        $result = $conn->query($sql);

        $rows = array();
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        echo json_encode($rows);

    }
}

$conn->close();
?>