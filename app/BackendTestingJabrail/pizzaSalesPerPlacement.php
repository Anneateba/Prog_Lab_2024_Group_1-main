<?php
// Подключение к базе данных
include '/var/www/html/ajax/includes/connectDB.php';

// Проверка соединения
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Получение параметров фильтрации
$filterType = isset($_POST['filterType']) ? $_POST['filterType'] : 'zipcode';

// Подготовка SQL запроса в зависимости от фильтрации
switch ($filterType) {
    case 'state':
        $sql = "
            SELECT s.state, COUNT(oi.sku) AS totalPizzas
            FROM orders o
            JOIN orderItems oi ON o.orderID = oi.orderID
            JOIN stores s ON o.storeID = s.storeID
            GROUP BY s.state
        ";
        break;
    case 'city':
        $sql = "
            SELECT s.city, COUNT(oi.sku) AS totalPizzas
            FROM orders o
            JOIN orderItems oi ON o.orderID = oi.orderID
            JOIN stores s ON o.storeID = s.storeID
            GROUP BY s.city
        ";
        break;
    case 'zipcode':
    default:
        $sql = "
            SELECT s.zipcode, COUNT(oi.sku) AS totalPizzas
            FROM orders o
            JOIN orderItems oi ON o.orderID = oi.orderID
            JOIN stores s ON o.storeID = s.storeID
            GROUP BY s.zipcode
        ";
        break;
}

// Выполнение запроса и возврат результата
include '/var/www/html/ajax/includes/makeQuery.php';

