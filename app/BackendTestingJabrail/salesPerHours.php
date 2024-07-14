<?php
// file for ajax request to get sales figures by hour
include '/var/www/html/ajax/includes/checkInput.php';
include '/var/www/html/ajax/includes/connectDB.php';


// Fetch filter values
$view = $_POST['view'] ?? 'completeView';
$mode = $_POST['mode'] ?? 'absolute';
$year = $_POST['year'] ?? 'alltime';
$month = $_POST['month'] ?? 'alltime';
$week = $_POST['week'] ?? 'alltime';

$time_intervals = [
    'Morning' => ['06:00:00', '11:59:59'],
    'Lunch' => ['12:00:00', '15:59:59'],
    'Evening' => ['16:00:00', '21:59:59'],
    'Night' => ['22:00:00', '05:59:59']
];

$data = [];

// Prepare SQL queries for each time interval
foreach ($time_intervals as $label => $interval) {
    $start_time = $interval[0];
    $end_time = $interval[1];

    $sql = "
        SELECT \"$label\" AS interval, COUNT(oi.SKU) AS totalPizzas
        FROM orders o
        JOIN orderItems oi ON o.orderID = oi.orderID
        WHERE TIME(o.orderDate) BETWEEN '$start_time' AND '$end_time'
    ";

    if ($year != 'alltime') {
        $sql .= " AND YEAR(o.orderDate) = $year";
    }

    if ($month != 'alltime') {
        $sql .= " AND MONTH(o.orderDate) = $month";
    }

    if ($week != 'alltime') {
        $sql .= " AND WEEK(o.orderDate, 1) = $week";
    }

    if ($mode == 'average') {
        $sql = "
            SELECT '$label' AS interval, AVG(totalPizzas) AS totalPizzas FROM ($sql) AS subquery
        ";
    }

    $data[] = $sql;
}
echo $sql;
// Combine all interval queries
$sql = implode(" UNION ALL ", $data);

// Execute query and return result
include '/var/www/html/ajax/includes/makeQuery.php';
?>
