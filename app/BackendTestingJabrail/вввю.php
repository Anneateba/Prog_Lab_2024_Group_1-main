/*
Datei zur bequemen 
Speicherung von Jahreszeilen,
die vor ihrer Verarbeitung 
oder Änderung 
zurückgegeben werden müssen,
wird ebenfalls später gelöscht.
*/





<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Pizza Sales Chart</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="pizza_sold_per_store.css">
</head>

<body>
<div class="soldPizzasPerStore">
    <button onclick="soldPizzasPerStore()">Sold pizzas per store</button>
</div>
<div class="controls">
    <label for="store-select">Select Store:</label>
    <select id="store-select">
        <!-- Store options will be added by JavaScript -->
    </select>

    <label for="time-period-select">Select Time Period:</label>
    <select id="time-period-select">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
    </select>
</div>

<div class="chart-container">
    <div id="chartjs-container">
        <canvas id="chartjs"></canvas>
    </div>
    <div id="echarts-container"></div>
</div>

<!-- Include Chart.js and ECharts -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>

<script>

function soldPizzasPerStore(){
            // Perform any function or operations here
            console.log("Button clicked!");
            // Redirect to the new page
            window.location.href = "pizza_sold_per_store.html";
        }

    const storeIds = [
        "S490972", "S476770", "S750231", "S688745", "S817950", "S948821",
        "S872983", "S799887", "S013343", "S068548", "S449313", "S263879",
        "S276746", "S606312", "S062214", "S064089", "S058118", "S361257",
        "S918734", "S351225", "S048150", "S370494", "S080157", "S588444",
        "S486166", "S669665", "S216043", "S396799", "S505400", "S147185",
        "S122017", "S302800"
    ];

    const fakeData = {
        daily: Array.from({ length: 7 }, () => Math.floor(Math.random() * 51)),
        weekly: Array.from({ length: 4 }, () => Math.floor(Math.random() * 250 + 50)),
        monthly: Array.from({ length: 12 }, () => Math.floor(Math.random() * 1200 + 300)),
        yearly: Array.from({ length: 5 }, () => Math.floor(Math.random() * 10000 + 2000))
    };

    const storeSelect = document.getElementById('store-select');
    const timePeriodSelect = document.getElementById('time-period-select');
    const chartjsContainer = document.getElementById('chartjs');
    const echartsContainer = document.getElementById('echarts-container');

    storeIds.forEach(store => {
        const option = document.createElement('option');
        option.value = store;
        option.textContent = store;
        storeSelect.appendChild(option);
    });

    const chartjsConfig = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Pizzas Sold',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const echartsConfig = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [],
            type: 'line'
        }]
    };

    const chartjsChart = new Chart(chartjsContainer.getContext('2d'), chartjsConfig);
    const echartsChart = echarts.init(echartsContainer);
    echartsChart.setOption(echartsConfig);

    function updateCharts() {
        const selectedStore = storeSelect.value;
        const selectedPeriod = timePeriodSelect.value;
        const data = fakeData[selectedPeriod];
        const labels = {
            daily: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            weekly: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            monthly: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            yearly: ['2019', '2020', '2021', '2022', '2023']
        }[selectedPeriod];

        // Update Chart.js
        chartjsChart.data.labels = labels;
        chartjsChart.data.datasets[0].data = data;
        chartjsChart.update();

        // Update ECharts
        echartsChart.setOption({
            xAxis: { data: labels },
            series: [{ data }]
        });
    }

    storeSelect.addEventListener('change', updateCharts);
    timePeriodSelect.addEventListener('change', updateCharts);

    // Initial load
    updateCharts();
</script>

</body>
</html>

$(document).ready(function () {
   
   function fetchData() {
       var view = $('#view').val();
       var mode = $('#mode').val();
       var year = $('#year').val();
       var month = $('#month').val();
       var week = $('#week').val();

   


      
       $('#tablePerTime').empty();
       $('#tablePerStore').empty();

       
       var ready = false
       switch (view) {
           case "completeView":
               $('#year, #month, #week, #timeframeSettingsLabel').hide()
               if (mode) { ready = true };
               break;
           case "yearView":
               $('#year, #timeframeSettingsLabel').show()
               $('#month, #week').hide()
               if (mode && year) { ready = true };
               break;
           case "monthView":
               $('#year, #month, #timeframeSettingsLabel').show()
               $('#week').hide()
               if (mode && year && month) { ready = true };
               break;
           case "weekView":
               $('#year, #week, #timeframeSettingsLabel').show()
               $('#month').hide()
               if (mode && year && week) { ready = true };
               break;
       };


       
       if (ready) {

           $('#loading3').show(); 
           
           $.ajax({
               url: '/BackendTestingJabrail/salesPerHours.php',
               type: 'POST',
               data: {
                   view: view,
                   mode: mode,
                   year: year,
                   month: month,
                   week: week
               },
               success: function (response) {
                   if (response.success) {
                      
                       createChart(response.data, 'salesChartPerStorePerMonth', 'line');
                   } else {
                       $('#salesPerStorePerMonth').html('<p>' + response.message + '</p>');
                   }
               },
               error: function (xhr, status, error) {
                   console.log('AJAX Error:', status, error);
               },
               complete: function () {
                   $('#loading3').hide(); 
               }
           });

           $('#loading').show();
           
           $.ajax({
               url: '/ajax/getSalesPerPizza.php',
               type: 'POST',
               data: {
                   view: view,
                   mode: mode,
                   year: year,
                   month: month,
                   week: week

               },
               success: function (response) {
                   if (response.success) {
                       
                       displayJsonTable(response.data, "tablePerTime");

                       createChart(response.data, 'salesChart', 'bar');
                   } else {
                       $('#salesPerTime').html('<p>' + response.message + '</p>');
                   }
               },
               error: function (xhr, status, error) {
                   console.log('AJAX Error:', status, error);
               },
               complete: function () {
                   $('#loading').hide(); 
               }
           });

           $('#loading2').show();
           
           $.ajax({
               url: '/ajax/getSalesPerStore.php',
               type: 'POST',
               data: {
                   view: view,
                   mode: mode,
                   year: year,
                   month: month,
                   week: week
               },
               success: function (response) {
                   if (response.success) {
                      
                       displayJsonTable(response.data, "tablePerStore");

                       createChart(response.data, 'salesChartPerStore', "bar");
                   } else {
                       $('#salesPerStore').html('<p>' + response.message + '</p>');
                   }
               },
               error: function (xhr, status, error) {
                   console.log('AJAX Error:', status, error);
               },
               complete: function () {
                   $('#loading2').hide(); 
               }
           });


       }
   }
     
   function fetchExtraData() {
       var view = $('#view').val();
       var mode = $('#mode').val();
       var year = $('#year').val();
       var month = $('#month').val();
       var week = $('#week').val();

      
       $('#salesByHourTable tbody').empty();
       $('#distanceTable tbody').empty();
       $('#salesTable tbody').empty();

       
       var ready = false;
       switch (view) {
           case "completeView":
               $('#year, #month, #week, #timeframeSettingsLabel').hide();
               if (mode) { ready = true; }
               break;
           case "yearView":
               $('#year, #timeframeSettingsLabel').show();
               $('#month, #week').hide();
               if (mode && year) { ready = true; }
               break;
           case "monthView":
               $('#year, #month, #timeframeSettingsLabel').show();
               $('#week').hide();
               if (mode && year && month) { ready = true; }
               break;
           case "weekView":
               $('#year, #week, #timeframeSettingsLabel').show();
               $('#month').hide();
               if (mode && year && week) { ready = true; }
               break;
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