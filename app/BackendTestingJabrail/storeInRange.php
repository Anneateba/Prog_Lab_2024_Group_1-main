<?php
// Проверка входных данных
include '/var/www/html/ajax/includes/checkInput.php';
// Подключение к базе данных
include '/var/www/html/ajax/includes/connectDB.php';

// Проверка соединения
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Получение координат из POST-запроса
$minLatitude = isset($_POST['minLatitude']) ? (float)$_POST['minLatitude'] : null;
$maxLatitude = isset($_POST['maxLatitude']) ? (float)$_POST['maxLatitude'] : null;
$minLongitude = isset($_POST['minLongitude']) ? (float)$_POST['minLongitude'] : null;
$maxLongitude = isset($_POST['maxLongitude']) ? (float)$_POST['maxLongitude'] : null;

if ($minLatitude === null || $maxLatitude === null || $minLongitude === null || $maxLongitude === null) {
    echo json_encode(['success' => false, 'message' => 'Invalid coordinates provided.']);
    exit;
}

// Подготовка SQL-запроса
$sql = "SELECT COUNT(*) as store_count FROM stores WHERE latitude BETWEEN $minLatitude AND $maxLatitude AND longitude BETWEEN $minLongitude AND $maxLongitude";

// Выполнение запроса и возврат результата
include '/var/www/html/ajax/includes/makeQuery.php';
?>
