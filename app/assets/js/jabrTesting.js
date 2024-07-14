$(document).ready(function () {
    function fetchStoreInfo() {
        $('#loading').show();

        const storeID = $('#storeDropdown').val();

        $.ajax({
            url: '/BackendTestingJabrail/storeLocationTransfer.php',
            type: 'POST',
            dataType: 'json',
            data: { storeID: storeID },
            success: function (response) {
                $('#loading').hide();
                if (response.success) {
                    const tableBody = $('#storeTable tbody');
                    tableBody.empty();

                    const data = response.data;
                    data.forEach(function (store) {
                        const row = $('<tr>');
                        row.append($('<td>').text(store.storeID));
                        row.append($('<td>').text(store.zipcode));
                        row.append($('<td>').text(store.stateAbbr));
                        row.append($('<td>').text(store.latitude));
                        row.append($('<td>').text(store.longitude));
                        row.append($('<td>').text(store.city));
                        row.append($('<td>').text(store.stateFull));
                        row.append($('<td>').text(store.distance));
                        tableBody.append(row);
                    });
                } else {
                    $('#storeTable tbody').html('<tr><td colspan="8">' + response.message + '</td></tr>');
                }
            },
            error: function () {
                $('#loading').hide();
                $('#storeTable tbody').html('<tr><td colspan="8">Error fetching data</td></tr>');
            }
        });
    }

    $('#storeDropdown').change(function () {
        fetchStoreInfo();
        fetchRevenueData();
        fetchPizzasSoldData();
    });

    function updateTableHeader(view) {
        const revenueTableHeader = $('#additionalTable thead');
        const pizzaSoldTableHeader = $('#pizzaSoldTable thead');
        revenueTableHeader.empty();
        pizzaSoldTableHeader.empty();

        if (view === 'yearView') {
            revenueTableHeader.append(`
                <tr>
                    <th>Store ID</th>
                    <th>Period</th>
                    <th>Revenue</th>
                </tr>
            `);
            pizzaSoldTableHeader.append(`
                <tr>
                    <th>Store ID</th>
                    <th>Period</th>
                    <th>Total Pizzas</th>
                </tr>
            `);
        } else if (view === 'monthView' || view === 'weekView') {
            revenueTableHeader.append(`
                <tr>
                    <th>Store ID</th>
                    <th>Year</th>
                    <th>Period</th>
                    <th>Revenue</th>
                </tr>
            `);
            pizzaSoldTableHeader.append(`
                <tr>
                    <th>Store ID</th>
                    <th>Year</th>
                    <th>Period</th>
                    <th>Total Pizzas</th>
                </tr>
            `);
        } else if (view === 'dayView') {
            revenueTableHeader.append(`
                <tr>
                    <th>Store ID</th>
                    <th>Morning</th>
                    <th>Lunch</th>
                    <th>Evening</th>
                    <th>Night</th>
                </tr>
            `);
            pizzaSoldTableHeader.append(`
                <tr>
                    <th>Store ID</th>
                    <th>Morning</th>
                    <th>Lunch</th>
                    <th>Evening</th>
                    <th>Night</th>
                </tr>
            `);
        }
    }

    function fetchRevenueData() {
        var view = $('#view').val();
        var year = $('#year').val();
        var storeID = $('#storeDropdown').val();

        updateTableHeader(view);

        $.ajax({
            url: '/BackendTestingJabrail/revenuePerStore.php',
            type: 'POST',
            dataType: 'json',
            data: { storeID: storeID, view: view, year: year },
            success: function (response) {
                if (response.success) {
                    const tableBody = $('#additionalTable tbody');
                    tableBody.empty();

                    const data = response.data;
                    data.forEach(function (item) {
                        item.data.forEach(function (entry) {
                            const row = $('<tr>');
                            if (view === 'yearView') {
                                row.append($('<td>').text(item.storeID));
                                row.append($('<td>').text(entry.period));
                                row.append($('<td>').text(entry.revenue));
                            } else if (view === 'monthView' || view === 'weekView') {
                                row.append($('<td>').text(item.storeID));
                                row.append($('<td>').text(entry.year));
                                row.append($('<td>').text(entry.period));
                                row.append($('<td>').text(entry.revenue));
                            } else if (view === 'dayView') {
                                row.append($('<td>').text(item.storeID));
                                row.append($('<td>').text(entry.Morning));
                                row.append($('<td>').text(entry.Lunch));
                                row.append($('<td>').text(entry.Evening));
                                row.append($('<td>').text(entry.Night));
                            }
                            tableBody.append(row);
                        });
                    });
                } else {
                    $('#additionalTable tbody').html('<tr><td colspan="4">' + response.message + '</td></tr>');
                }
            },
            error: function () {
                $('#additionalTable tbody').html('<tr><td colspan="4">Error fetching data</td></tr>');
            }
        });
    }

    function fetchPizzasSoldData() {
        var view = $('#view').val();
        var year = $('#year').val();
        var storeID = $('#storeDropdown').val();

        updateTableHeader(view);

        $.ajax({
            url: '/BackendTestingJabrail/pizzaSalesPerStore.php',
            type: 'POST',
            dataType: 'json',
            data: { storeID: storeID, view: view, year: year },
            success: function (response) {
                if (response.success) {
                    const tableBody = $('#pizzaSoldTable tbody');
                    tableBody.empty();

                    const data = response.data;
                    data.forEach(function (item) {
                        item.data.forEach(function (entry) {
                            const row = $('<tr>');
                            if (view === 'yearView') {
                                row.append($('<td>').text(item.storeID));
                                row.append($('<td>').text(entry.period));
                                row.append($('<td>').text(entry.totalPizzas));
                            } else if (view === 'monthView' || view === 'weekView') {
                                row.append($('<td>').text(item.storeID));
                                row.append($('<td>').text(entry.year));
                                row.append($('<td>').text(entry.period));
                                row.append($('<td>').text(entry.totalPizzas));
                            } else if (view === 'dayView') {
                                row.append($('<td>').text(item.storeID));
                                row.append($('<td>').text(entry.Morning));
                                row.append($('<td>').text(entry.Lunch));
                                row.append($('<td>').text(entry.Evening));
                                row.append($('<td>').text(entry.Night));
                            }
                            tableBody.append(row);
                        });
                    });
                } else {
                    $('#pizzaSoldTable tbody').html('<tr><td colspan="4">' + response.message + '</td></tr>');
                }
            },
            error: function () {
                $('#pizzaSoldTable tbody').html('<tr><td colspan="4">Error fetching data</td></tr>');
            }
        });
    }

    function updatePeriodTableHeader() {
        const periodTableHeader = $('#periodRevenueTable thead');
        periodTableHeader.empty();
        periodTableHeader.append(`
            <tr>
                <th>Store ID</th>
                <th>Year</th>
                <th>Revenue</th>
            </tr>
        `);
    }
    
    function fetchPeriodRevenueData() {
        var periodType = $('#periodView').val();
        var storeID = $('#storeDropdown').val();
        var periodValue = null;
    
        if (periodType === 'oneMonth') {
            periodValue = $('#month').val();
        } else if (periodType === 'threeMonths') {
            periodValue = $('#threeMonthsPeriod').val();
        } else if (periodType === 'sixMonths') {
            periodValue = $('#sixMonthsPeriod').val();
        }
    
        console.log('fetchPeriodRevenueData:', { storeID, periodType, periodValue });
    
        updatePeriodTableHeader();
    
        $.ajax({
            url: '/BackendTestingJabrail/periodenRevenuePerYears.php',
            type: 'POST',
            dataType: 'json',
            data: { storeID: storeID, periodType: periodType, periodValue: periodValue },
            success: function (response) {
                console.log('Period revenue data response:', response); // Log response for debugging
                if (response.success) {
                    const tableBody = $('#periodRevenueTable tbody');
                    tableBody.empty();
    
                    const data = response.data[0].data; // Get the correct data array
                    data.forEach(function (item) {
                        console.log('Processing item:', item); // Log each item to check its structure
                        const row = $('<tr>');
                        row.append($('<td>').text(storeID)); // Add storeID to each row
                        row.append($('<td>').text(item.year)); // Add year to each row
                        row.append($('<td>').text(item.revenue)); // Add revenue to each row
                        tableBody.append(row);
                    });
                } else {
                    $('#periodRevenueTable tbody').html('<tr><td colspan="3">' + response.message + '</td></tr>');
                }
            },
            error: function () {
                $('#periodRevenueTable tbody').html('<tr><td colspan="3">Error fetching data</td></tr>');
            }
        });
    }
    
    
    
    $('#periodView').change(function () {
        var periodType = $(this).val();
        $('#monthSettings').hide();
        $('#threeMonthsSettings').hide();
        $('#sixMonthsSettings').hide();
    
        if (periodType === 'oneMonth') {
            $('#monthSettings').show();
        } else if (periodType === 'threeMonths') {
            $('#threeMonthsSettings').show();
        } else if (periodType === 'sixMonths') {
            $('#sixMonthsSettings').show();
        }
    });
    
    $('#periodView, #month, #threeMonthsPeriod, #sixMonthsPeriod').change(function () {
        fetchPeriodRevenueData();
    });
    
    function fetchData(url, tableId) {
        var view = $('#view').val();
        var year = $('#year').val();
        var storeID = $('#storeDropdown').val();

        switch (view) {
            case "yearView":
                $('#timeframeSettings').hide();
                break;
            case "monthView":
            case "weekView":
            case "dayView":
                $('#timeframeSettings').show();
                break;
        }
    }

    // Включение вызова fetchData при изменении view
    $('#view').change(function () {
        fetchData();
        fetchRevenueData();
        fetchPizzasSoldData();
    });

    // Включение вызова fetchData при изменении года
    $('#year').change(function () {
        fetchRevenueData();
        fetchPizzasSoldData();
    });
    


   

    $('#view').change(function () {
        fetchRevenueData();
        fetchPizzasSoldData();
    });

    $('#year').change(function () {
        fetchRevenueData();
        fetchPizzasSoldData();
    });

    fetchStoreInfo();
    fetchRevenueData();
    fetchPizzasSoldData();
    fetchPeriodRevenueData();
});