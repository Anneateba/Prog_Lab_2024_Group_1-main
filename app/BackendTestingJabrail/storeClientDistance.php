<?php
// Подключение к базе данных
include '/var/www/html/ajax/includes/checkInput.php';
include '/var/www/html/ajax/includes/connectDB.php';

// Проверка соединения
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// SQL запрос для получения всех заказов и вычисления расстояний
$sql = "
    SELECT 
        o.orderID,
        o.customerID,
        o.storeID,
        (6371 * ACOS(
            COS(RADIANS(c.latitude)) * COS(RADIANS(s.latitude)) * 
            COS(RADIANS(s.longitude) - RADIANS(c.longitude)) + 
            SIN(RADIANS(c.latitude)) * SIN(RADIANS(s.latitude))
        )) AS distance
    FROM orders o
    JOIN customers c ON o.customerID = c.customerID
    JOIN stores s ON o.storeID = s.storeID
";

//make query and return result
include '/var/www/html/ajax/includes/makeQuery.php';
?>