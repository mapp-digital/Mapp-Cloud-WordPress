<?php

function run_query($query, $message) {
    $host= "db";
    $username = "root";
    $password = "root";

    // Create connection
    $conn = new mysqli($host, $username, $password);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    // Run query
    if ($conn->query($query) === TRUE) {
        echo $message;
        echo "\n";
    } else {
        echo "Error: " . $conn->error;
        echo "\n";
    }

    $conn->close();
}

function drop_db() {
    run_query("DROP DATABASE testdb", "Dropping Wordpress database...");
    run_query("CREATE DATABASE testdb", "Clean Wordpress database created.");
  }


if(key_exists(1, $argv) && function_exists($argv[1])) {
    call_user_func($argv[1]);
} else {
    echo "PHP function not found - check arguments when running dp.php!";
    echo "\n";
}

?>
