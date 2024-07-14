<?php
$result = $conn->query($sql);
// Close connection
$conn->close();

if ($result) {
    $data = [];

    if (isset($multipleDataset)) {
        $fields = $result->fetch_fields();
        $setLabel = $fields[0]->name; // what is the identifier of one dataset
        $xLabel1 = $fields[1]->name;  // what will be the first x axis (year)
        $xLabel2 = count($fields) > 3 ? $fields[2]->name : null; // what will be the second x axis (period), if it exists
        $yLabel = count($fields) > 4 ? $fields[3]->name : null; // what will be the third x axis if it exists
        $lastLabel = $fields[count($fields) - 1]->name; // what will be the y axis (revenue)

        foreach ($result as $row) {
            $columns = array_values($row); // Get the row values as an array
            $storeID = $columns[0];        // First column is storeID
            $x1 = $columns[1];             // Second column is the first x axis (year)
            $x2 = $xLabel2 ? $columns[2] : null; // Third column is the second x axis (period) if it exists
            $x3 = $yLabel ? $columns[3] : null; // Fourth column is the third x axis (if it exists)
            $y = $columns[count($columns) - 1]; // Last column is the y axis (revenue)

            if (!isset($data[$storeID])) {
                $data[$storeID] = [
                    $setLabel => $storeID,
                    'data' => []
                ];
            }

            $dataEntry = [$xLabel1 => $x1, $lastLabel => $y];
            if ($x2 !== null) {
                $dataEntry[$xLabel2] = $x2;
            }
            if ($x3 !== null) {
                $dataEntry[$yLabel] = $x3;
            }

            $data[$storeID]['data'][] = $dataEntry;
        }

        // Re-index the array to match the desired output format
        $output = array_values($data);

        // Convert to JSON and send response
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'data' => $output]);
    } else {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $data]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Query failed: ' . $conn->error]);
}
?>