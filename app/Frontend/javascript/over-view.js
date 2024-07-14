// function needed to interact with the ajax calls and the data from the database
$(document).ready(function () {
    function fetchData() {
        var view = $('#sold-time').val();
        var mode = $('#data-display').val();
        var year = $('#yearDropdown').val();
        var month = $('#monthDropdown').val();
        var week = $('#weekDropdown').val();
        var toggle_percent = $('#stores-sold-toggle').val();
        var pizzaSize = $('#pizza-size').val();

        var ready = false;
        switch (view) {
            case "yearView":
                $('#yearDropdown').show();
                $('#monthDropdown, #weekDropdown').hide();
                if (mode && year) {
                    ready = true;
                }
                break;
            case "monthView":
                $('#yearDropdown, #monthDropdown').show();
                $('#weekDropdown').hide();
                if (mode && year && month) {
                    ready = true;
                }
                break;
            case "weekView":
                $('#yearDropdown, #weekDropdown').show();
                $('#monthDropdown').hide();
                if (mode && year && week) {
                    ready = true;
                }
                break;
        }

        if (ready) {
            // Line-Chart
            $('#loading-line-chart').show();
            $.ajax({
                url: '../ajax/getSalesPerTimeframe.php',
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
                        lineChartSales(response.data);
                    } else {
                        $('#chart-container').html('<p>' + response.message + '</p>');
                    }
                },
                error: function (xhr, status, error) {
                    console.log('AJAX Error:', status, error);
                },
                complete: function () {
                    $('#loading-line-chart').hide();
                }
            });
            // Store-Bar-Chart
            $('#loading-stores-sold').show();
            $.ajax({
                url: '../ajax/getSalesPerStore.php',
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
                        if (toggle_percent === 'percent') {
                            storesPercentBarChart(response.data);
                        } else {
                            storesValueBarChart(response.data);
                        }
                    } else {
                        $('#chart-container').html('<p>' + response.message + '</p>');
                    }
                },
                error: function (xhr, status, error) {
                    console.log('AJAX Error:', status, error);
                },
                complete: function () {
                    $('#loading-stores-sold').hide();
                }
            });
            // Store-Bar-Chart2
            $('#loading-bar-no-percent').show();
            $.ajax({
                url: '../ajax/getSalesPerStore.php',
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
                        if (toggle_percent === 'percent') {
                            storesPercentBarChart(response.data);
                        } else {
                            storesValueBarChart(response.data);
                        }
                    } else {
                        $('#chart-container').html('<p>' + response.message + '</p>');
                    }
                },
                error: function (xhr, status, error) {
                    console.log('AJAX Error:', status, error);
                },
                complete: function () {
                    $('#loading-bar-no-percent').hide();
                }
            });
            // Stacking-Bar-Chart
            $('#loading-stacking-barchart').show();
            $.ajax({
                url: '../ajax/getSalesPerStore.php',
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
                        stackingBarChart(response.data);
                    } else {
                        $('#chart-container').html('<p>' + response.message + '</p>');
                    }
                },
                error: function (xhr, status, error) {
                    console.log('AJAX Error:', status, error);
                },
                complete: function () {
                    $('#loading-stacking-barchart').hide();
                }
            });
            // Pie-Chart
            $('#loading-pie-chart-pizza').show();
            $.ajax({
                url: '../ajax/getSalesPerStore.php',
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
                        pieChartStores(response.data);
                    } else {
                        $('#chart-container').html('<p>' + response.message + '</p>');
                    }
                },
                error: function (xhr, status, error) {
                    console.log('AJAX Error:', status, error);
                },
                complete: function () {
                    $('#loading-pie-chart-pizza').hide();
                }
            });
            // Map
            $('#loading-map').show();
            $.ajax({
                url: '../ajax/getStoreInfo.php',
                type: 'POST',
                success: function (response) {
                    if (response.success) {
                        mapStores(response.data);
                    } else {
                        $('#chart-container').html('<p>' + response.message + '</p>');
                    }
                },
                error: function (xhr, status, error) {
                    console.log('AJAX Error:', status, error);
                },
                complete: function () {
                    $('#loading-map').hide();
                }
            });
            // // Bump-Chart1
            // $('#loading-bump-chart-Pizza').show();
            // $.ajax({
            //     url: '../ajax/getSalesPerStore.php',
            //     type: 'POST',
            //     data: {
            //         view: view,
            //         mode: mode,
            //         year: year,
            //         month: month,
            //         week: week
            //     },
            //     success: function (response) {
            //         if (response.success) {
            //             bumpChartPizzaRanking(response.data);
            //         } else {
            //             $('#chart-container').html('<p>' + response.message + '</p>');
            //         }
            //     },
            //     error: function (xhr, status, error) {
            //         console.log('AJAX Error:', status, error);
            //     },
            //     complete: function () {
            //         $('#loading-bump-chart-Pizza').hide();
            //     }
            // });
            // // Bump-Chart2
            // $('#loading-bump-chart-Store').show();
            // $.ajax({
            //     url: '../ajax/getSalesPerStore.php',
            //     type: 'POST',
            //     data: {
            //         view: view,
            //         mode: mode,
            //         year: year,
            //         month: month,
            //         week: week
            //     },
            //     success: function (response) {
            //         if (response.success) {
            //             bumpChartStoreRanking(response.data, mode)
            //         } else {
            //             $('#chart-container').html('<p>' + response.message + '</p>');
            //         }
            //     },
            //     error: function (xhr, status, error) {
            //         console.log('AJAX Error:', status, error);
            //     },
            //     complete: function () {
            //         $('#loading-bump-chart-Store').hide();
            //     }
            // });
        }
    }

    fetchData();
    $('#updateButton').click(fetchData);

    $('#sold-time').change(function () {
        var view = $(this).val();
        switch (view) {
            case "yearView":
                $('#yearDropdown').show();
                $('#monthDropdown, #monthDropdownTitle, #weekDropdown, #weekDropdownTitle').hide();
                break;
            case "monthView":
                $('#yearDropdown, #monthDropdown, #monthDropdownTitle').show();
                $('#weekDropdown, #weekDropdownTitle').hide();
                break;
            case "weekView":
                $('#yearDropdown, #weekDropdown, #weekDropdownTitle').show();
                $('#monthDropdown, #monthDropdownTitle').hide();
                break;
            default:
                $('#yearDropdown, #monthDropdown, #weekDropdown').hide();
                break;
        }
    }).trigger('change');

});

// Showing the total Sales in a given timeframe
function lineChartSales(data) {

    var keys = Object.keys(data[0]);
    var storeID = keys[0];
    var storeValue = keys[1];

    var storeNames = data.map(item => item[storeID]);
    var storeValues = data.map(item => item[storeValue]);

    const overAllSold = echarts.init(document.getElementById('line-chart-sales'));

    var existingChart = echarts.getInstanceByDom(overAllSold);
    if (existingChart) {
        echarts.dispose(existingChart);
    }
    if (document.getElementById('data-display').value === 'units') {
        var yAxisLabel = 'Units Sold in Thousands';
    } else {
        var yAxisLabel = 'Revenue in Thousands';
    }
    if (document.getElementById('sold-time').value === 'weekView') {
        var xAxisLabel = 'Week Days';
    } else if (document.getElementById('sold-time').value === 'monthView') {
        var xAxisLabel = 'Month in Days';
    } else {
        var xAxisLabel = 'Year in Months';
    }
    var option = {
        title: {
            text: 'Sales Data'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '6%',
            right: '2%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: storeNames,
            name: xAxisLabel,
            nameLocation: 'middle',
            nameGap: 25,
            nameTextStyle: {
                fontSize: 16
            }
        },
        yAxis: {
            type: 'value',
            name: yAxisLabel,
            nameTextStyle: {
                fontSize: 16
            },
        },
        series: [{
            name: 'Sales',
            type: 'line',
            data: storeValues,
            itemStyle: {
                color: 'rgba(75, 192, 192, 0.8)'
            }
        }]
    };

    overAllSold.setOption(option);
    option && overAllSold.setOption(option);
    overAllSold.resize({width: 1000, height: 400})

}

// Showing the total Sales/Revenue for each store in the selected time frame
function storesValueBarChart(data) {
    var keys = Object.keys(data[0]);
    var storeID = keys[0];
    var storeValue = keys[1];


    const sortedBarchartStores = echarts.init(document.getElementById('stores-sold-barchart'));

    var existingChart = echarts.getInstanceByDom(sortedBarchartStores);
    if (existingChart) {
        echarts.dispose(existingChart);
    }

    var storeDataWithStoreID = data.map(item => ({
        value: item[storeValue],
        category: item[storeID]
    }));

    storeDataWithStoreID.sort((a, b) => b.value - a.value);

    var sortedStoreData = storeDataWithStoreID.map(item => item.value);
    var sortedStoreID = storeDataWithStoreID.map(item => item.category);

    if (document.getElementById('data-display').value === 'units') {
        var yAxisLabel = 'Units Sold in Thousands';
    } else {
        var yAxisLabel = 'Revenue in Thousands';
    }
    var option = {
        title: {
            text: 'Sales Data'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '8%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: sortedStoreID,
            name: 'Store Names',
            nameLocation: 'middle',
            nameGap: 50,
            nameTextStyle: {
                fontSize: 16
            },
            axisLabel: {
                formatter: '{value}',
                rotate: 45
            },
        },
        yAxis: {
            type: 'value',
            name: yAxisLabel,
            nameTextStyle: {
                fontSize: 16
            },
            axisLabel: {
                formatter: '{value}',
                rotate: 45
            }
        },
        series: [{
            name: 'Sales',
            type: 'bar',
            data: sortedStoreData,
            itemStyle: {
                color: 'rgba(75, 192, 192, 0.8)'
            }
        }]
    };

    option && sortedBarchartStores.setOption(option);
    sortedBarchartStores.resize({width: 1000, height: 500})
}

// Showing the percentage of total Sales/Revenue for each store in comparison to the total sales in the selected time frame
function storesPercentBarChart(data) {
    var keys = Object.keys(data[0]);
    var storeData = keys[0];
    var storeID = keys[1];

    const sortedBarchartStores = echarts.init(document.getElementById('stores-sold-barchart'));

    var existingChart = echarts.getInstanceByDom(sortedBarchartStores);
    if (existingChart) {
        echarts.dispose(existingChart);
    }

    var storeDataWithStoreID = data.map(item => ({
        value: item[storeID],
        category: item[storeData]
    }));

    storeDataWithStoreID.sort((a, b) => b.value - a.value);

    var totalValue = storeDataWithStoreID.reduce((sum, item) => sum + parseFloat(item.value), 0);

    var sortedStoreData = storeDataWithStoreID.map(item => {
        return parseFloat(((item.value / totalValue) * 100).toFixed(2));
    });

    var sortedStoreID = storeDataWithStoreID.map(item => item.category);

    var yAxisLabel;
    if (document.getElementById('data-display').value === 'units') {
        yAxisLabel = 'Percentage of Units Sold';
    } else {
        yAxisLabel = 'Percentage of Revenue';
    }

    var option = {
        title: {
            text: 'Sales Data'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                var total = 0;
                params.forEach(function (item) {
                    total += item.value;
                });
                return params[0].name + '<br>' + params.map(function (item) {
                    return item.marker + item.seriesName + ' % : ' + item.value.toFixed(2) + '%';
                })//.join('<br>') + '<br>Total: ' + total.toFixed(2) + '%';
            }
        },

        grid: {
            left: '8%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: sortedStoreID,
            name: 'Store Names',
            nameLocation: 'middle',
            nameGap: 50,
            nameTextStyle: {
                fontSize: 16
            },
            axisLabel: {
                formatter: '{value}',
                rotate: 45
            },
        },
        yAxis: {
            type: 'value',
            name: yAxisLabel,
            nameLocation: 'end',
            nameGap: 10,
            nameTextStyle: {
                fontSize: 16
            },
            axisLabel: {
                formatter: '{value}%',
                rotate: 45,
                padding: [0, 20, 0, 0]
            }
        },
        series: [{
            name: 'Sales',
            type: 'bar',
            data: sortedStoreData,
            itemStyle: {
                color: 'rgba(75, 192, 192, 0.8)'
            }
        }]
    };

    sortedBarchartStores.setOption(option);
    sortedBarchartStores.resize({width: 1000, height: 500});
}

// A Stacking Bar Chart visualizing the percentage of sales for each store together with Pizzas Ordered
function stackingBarChart(data) {

    var chartDom = document.getElementById('stacking-barchart-pizza');
    var myChart = echarts.init(chartDom);

    // Sample data, replace with `data` from AJAX call
    const rawData = [
        [100, 302, 301, 334, 390, 330, 320],
        [320, 132, 101, 134, 90, 230, 210],
        [220, 182, 191, 234, 290, 330, 310],
        [150, 212, 201, 154, 190, 330, 410],
        [820, 832, 901, 934, 1290, 1330, 1320]
    ];

    const totalData = rawData[0].map((_, colIndex) => rawData.reduce((sum, row) => sum + row[colIndex], 0));

    const series = rawData.map((data, index) => ({
        name: `Series ${index + 1}`,
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        label: {
            show: true,
            formatter: (params) => `${(params.value / totalData[params.dataIndex] * 100).toFixed(2)}%`
        },
        data: data.map((value, i) => (totalData[i] === 0 ? 0 : value / totalData[i]))
    }));

    const option = {
        title: {
            text: 'Stacking Bar Chart'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: series
    };

    myChart.setOption(option);


}

// shows a piechart based the most sold Pizza times (based on size of the pizza, can also show all pizzas)
function pieChartStores() {
    const pieChart = echarts.init(document.getElementById('pie-chart'));
    option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 1048, name: 'Others', size: 'Large'},
                    {value: 735, name: 'Pepperoni', size: 'Medium'},
                    {value: 580, name: 'Margarita', size: 'Small'},
                    {value: 484, name: 'Hawaii', size: 'Medium'},
                    {value: 300, name: 'Chicken BBQ', size: 'Large'}
                ],
                color: ['#808080', '#98FF98', '#efc164', '#d287eb', '#87CEEB']
            }
        ]
    };

    pieChart.setOption(option);
    pieChart.resize({width: 500, height: 500});
}

// a map function that shows all stores on a map with their store ID and distance from the main store
function mapStores(data) {
    var map = L.map('map').setView([40, -120], 4.5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var stores = [
        { lat: 41.328852, lng: -116.12251, name: 'Tuscarora', StoreID: 'S490972'},
        { lat: 37.593883, lng: -121.88281, name: 'Sunol', StoreID: 'S476770' }
    ];

    stores.forEach(store => {
        L.marker([store.lat, store.lng]).addTo(map)
            .bindPopup(store.name)
            .openPopup();
    });
}

// shows a bump chart of the Top 10 pizza ranked based on the sales
function bumpChartPizzaRanking() {
    var myChart =  document.getElementById('bump-chart-Pizza');


    // Example data structure, replace with actual `data`
    const names = ['Margherita', 'Pepperoni', 'Meat Lovers', 'BBQ Chicken Pizza'];
    const years = ['2020', '2021', '2022', '2023'];
    const rankingData = {
        'Margherita': [1, 2, 3, 1],
        'Pepperoni': [2, 1, 2, 3],
        'Meat Lovers': [3, 3, 1, 2],
        'BBQ Chicken Pizza': [4, 4, 4, 4]
    };

    const series = Object.keys(rankingData).map(name => ({
        name,
        type: 'line',
        smooth: true,
        data: rankingData[name],
        lineStyle: { width: 4 }
    }));

    const option = {
        title: {
            text: 'Pizza Ranking Bump Chart'
        },
        tooltip: {
            trigger: 'item'
        },
        xAxis: {
            type: 'category',
            data: years
        },
        yAxis: {
            type: 'value',
            inverse: true,
            min: 1,
            max: names.length
        },
        series: series
    };

    myChart.setOption(option);
}

// shows a bump chart of the Top 10 stores ranked based on the sales/toggle between units and revenue
function bumpChartStoreRanking(data) {
    var chartDom = document.getElementById('bump-chart-Store');
    var myChart = echarts.init(chartDom);

    // Example data structure, replace with actual `data`
    const names = ['S505400', 'S361257', 'S216043', 'S080157'];
    const years = ['2020', '2021', '2022', '2023'];
    const rankingData = {
        'S505400': [1, 2, 3, 1],
        'S361257': [2, 1, 2, 3],
        'S216043': [3, 3, 1, 2],
        'S080157': [4, 4, 4, 4]
    };

    const series = Object.keys(rankingData).map(name => ({
        name,
        type: 'line',
        smooth: true,
        data: rankingData[name],
        lineStyle: { width: 4 }
    }));

    const option = {
        title: {
            text: 'Store Ranking Bump Chart'
        },
        tooltip: {
            trigger: 'item'
        },
        xAxis: {
            type: 'category',
            data: years
        },
        yAxis: {
            type: 'value',
            inverse: true,
            min: 1,
            max: names.length
        },
        series: series
    };

    myChart.setOption(option);
}

// to filter the dropdown list of stores
function filterDropdown() {
    var input, filter, div, a, i;
    input = document.getElementById("dropdownSearch");
    filter = input.value.toUpperCase();
    div = document.getElementsByClassName("dropdown-content")[0];
    a = div.getElementsByTagName("a");

    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

// to go to the store page of the store  that was selected
function navigateToStore(storeId) {
    var storeIDValue = document.getElementById("dropdownSearch")
    storeIDValue.value = storeId;
}

// function to open and close the sidebar
function openSideBar() {
    document.getElementById("sidebar").style.width = "40%";
}
// function to close the sidebar
function closeSideBar() {
    document.getElementById("sidebar").style.width = "0";
}
// Saving the Text in the Note Section as a .txt file
function saveText() {
    const noteText = document.getElementById('noteField').value;

    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);

    const blob = new Blob([noteText], {type: 'text/plain'});

    const link = document.createElement('a');

    link.download = `note_${formattedDate}.txt`

    link.href = window.URL.createObjectURL(blob);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}
// Saving all the graphs as images
function saveGraphs() {
    const charts = document.querySelectorAll('.chart-container');
    charts.forEach((chart, index) => {
        html2canvas(chart, {
            backgroundColor: '#FFFFFF', // Set background color to white
            onrendered: function(canvas) {
                const link = document.createElement('a');
                link.download = `chart_${index + 1}.jpeg`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            }
        });
    });
}
// test Function used to test out changes on graphs
function testfunc(data) {
    var keys = Object.keys(data[0]);
    var storeID = keys[0];
    var storeValue = keys[1];

    const sortedBarchartStores = echarts.init(document.getElementById('stores-sold-barchart'));

    var existingChart = echarts.getInstanceByDom(sortedBarchartStores);
    if (existingChart) {
        echarts.dispose(existingChart);
    }

    var storeDataWithStoreID = data.map(item => ({
        value: item[storeValue],
        category: item[storeID]
    }));

    storeDataWithStoreID.sort((a, b) => b.value - a.value);

    var sortedStoreData = storeDataWithStoreID.map(item => item.value);
    var sortedStoreID = storeDataWithStoreID.map(item => item.category);

    var yAxisLabel = document.getElementById('data-display').value === 'units' ? 'Units Sold' : 'Sales';

    var option = {
        title: {
            text: 'Sales Data'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                var category = params[0].name;
                var value = params[0].data;
                return `Store: ${category}<br/>Value: ${value}`;
            }
        },
        xAxis: {
            type: 'category',
            data: sortedStoreID,
            name: 'Store Names',
            nameLocation: 'middle',
            nameGap: 50,
            nameTextStyle: {
                fontSize: 16
            },
            axisLabel: {
                formatter: '{value}',
                rotate: 45,
                fontSize: 14
            }
        },
        yAxis: {
            type: 'value',
            name: yAxisLabel,
            nameTextStyle: {
                fontSize: 16
            },
            axisLabel: {
                formatter: '{value}',
                fontSize: 14
            }
        },
        series: [{
            name: 'Sales',
            type: 'bar',
            data: sortedStoreData,
            itemStyle: {
                color: 'rgba(75, 192, 192, 0.8)'
            }
        }]
    };

    sortedBarchartStores.setOption(option);
    sortedBarchartStores.resize({width: 1000, height: 500});
}

function testfunction2(data) {
    var keys = Object.keys(data[0]);
    var storeID = keys[0];
    var storeValue = keys[1];


    const sortedBarchartStores = echarts.init(document.getElementById('stores-sold-barchart'));

    var existingChart = echarts.getInstanceByDom(sortedBarchartStores);
    if (existingChart) {
        echarts.dispose(existingChart);
    }

    var storeDataWithStoreID = data.map(item => ({
        value: item[storeValue],
        category: item[storeID]
    }));

    storeDataWithStoreID.sort((a, b) => b.value - a.value);

    var sortedStoreData = storeDataWithStoreID.map(item => item.value);
    var sortedStoreID = storeDataWithStoreID.map(item => item.category);

    if (document.getElementById('data-display').value === 'units') {
        var yAxisLabel = 'Units Sold in Thousands';
    } else {
        var yAxisLabel = 'Revenue in Thousands';
    }
    var option = {
        title: {
            text: 'Sales Data'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '8%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: sortedStoreID,
            name: 'Store Names',
            nameLocation: 'middle',
            nameGap: 50,
            nameTextStyle: {
                fontSize: 16
            },
            axisLabel: {
                formatter: '{value}',
                rotate: 45
            },
        },
        yAxis: {
            type: 'value',
            name: yAxisLabel,
            nameTextStyle: {
                fontSize: 16
            },
            axisLabel: {
                formatter: '{value}',
                rotate: 45
            }
        },
        series: [{
            name: 'Sales',
            type: 'bar',
            data: sortedStoreData,
            itemStyle: {
                color: 'rgba(75, 192, 192, 0.8)'
            }
        }]
    };

    option && sortedBarchartStores.setOption(option);
    sortedBarchartStores.resize({width: 1000, height: 500})
}