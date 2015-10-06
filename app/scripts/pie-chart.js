

// Callback that creates and populates a data table,
// instantiates a dashboard, category-select boxes to filter the data, instantiates a pie chart,
// passes in the data and draws it.
function drawPieDashboard() {
    
    // Pick the first dataset in the JONStat ojbect (some JSON-stat objects may contain more than one)        
    var dataset = curDataset;
    
    // The JSONStat-dataset is formatted into a dataTable, which plays nice with googles chart library.
    var tbl = dataset.toTable({ type: "object" });
    
    // The newly created datatable is used as input to a google visualization dataTable. 0.6 indicates the api-version.
    var data = new google.visualization.DataTable(tbl, 0.6);

    var chartView = new google.visualization.DataView(data);

    chartView.hideRows([0]);
    var chartData = chartView.toDataTable();

    // Create a dashboard to hold the dataset controls
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    var timePicker = new google.visualization.ControlWrapper({
        'controlType': 'CategoryFilter',
        'containerId': 'time_picker',
        'options': {
            'filterColumnIndex': 0,
            'ui': {
                'labelStacking': 'vertical',
                'allowTyping': true,
                'allowMultiple': false,
                'sortValues': false,
                'cssClass': 'styled-category-filter'
            },
        },
        'state': {
            'selectedValues': ['2014']
        }
    });

    var monthPicker = new google.visualization.ControlWrapper({
        'controlType': 'CategoryFilter',
        'containerId': 'month_picker',
        'options': {
            'filterColumnIndex': 2,
            'ui': {
                'labelStacking': 'vertical',
                'allowTyping': true,
                'allowMultiple': false,
                'sortValues': false,
                'cssClass': 'styled-category-filter'
            },
        },
        'state': {
            'selectedValues': ['Total']
        }
    });

    var airportPicker = new google.visualization.ControlWrapper({
        'controlType': 'CategoryFilter',
        'containerId': 'airport_picker',
        'options': {
            'filterColumnIndex': 1,
            'ui': {
                'labelStacking': 'vertical',
                'allowTyping': true,
                'allowMultiple': true,
                'cssClass': 'styled-category-filter',
                'sortValues': false
            },
        }
    });                   
       
    // Create a pie chart and define some display options
    var pieChart = new google.visualization.ChartWrapper({
        'chartType': 'PieChart',
        'containerId': 'chart_div',
        'options': {
            'width': '100%',
            'height': 350,
            'pieSliceText': 'value',
            'legend': 'right',
            'colors': chartColors
        },
        'view': { 'columns': [1,3] }
    });

    // Establish dependencies, declaring that timePicker, monthPicker and airportPicker drives 'pieChart',
    // so that the pie chart will only display entries that are let through these filters.
    dashboard.bind(timePicker, pieChart);
    dashboard.bind(monthPicker, pieChart);
    dashboard.bind(airportPicker, pieChart);    

    // Draw the dashboard.
    dashboard.draw(chartData);
    
    // Make sure the chart is redrawn, whenever the window is resized.
    window.addEventListener('resize', function () { dashboard.draw(chartData) }, true);
}

