// Load the Visualization API with the controls package and relevant chart types
google.load('visualization', '1.0', { 'packages': ['corechart', 'controls', 'table', 'LineChart'] });

//Load data
//var datasetUrl = 'http://bank.stat.gl/sq/449af548-2263-4e0e-b8b7-47b264c35761'; // time,airport,month,value

// DATAFORMAT //
// First column: time (number). Choose multiple categories.
// Second column: Category (string) e.g. "airport". Choose multiple categories.
// Third column:  Category (string) e.g. "month". Choose one.

//var datasetUrl = 'http://bank.stat.gl/sq/2ea754be-6cc4-4ead-b349-b532d6e363ac'; // time,airport,month,value

// shrimp-data: http://bank.stat.gl/sq/2b43dd7d-1f2b-47d2-9924-759d3e56b743

// This function takes a number representint the column index of the column to toggle on/off

var curDataset, pivotedData, init, shownColumns, curChartColors = null;

var chartColors = ['#dc3912', '#fb6705', '#41c190', '#32a9b2', '#f6bd0a', '#9f194f', '#05344a', '#00020f', '#fb5457', '#fba105', '#95b437', '#15b0bb','#056466', '#3c986a', '#b32a09', '#f57649', '#e16488', '#138ab6', '#0dbb94', '#2f5f70   ', '#9873a6', '#cab98f  ', '#c0617c', '#1d8870','#90bb0d', '#f24c54', '#528ab2'];

var toggleColumn = function (value) {
    console.log('toggling column: ', value);
    var options = toggleSeries(value);
    shownColumns = options.columns;
    curChartColors = options.colors;
    console.log(shownColumns, curChartColors);
    drawDashboard();
}

// Set a callback to run when the Google Visualization API is loaded. 
google.setOnLoadCallback(
    function () {
        JSONstat('http://bank.stat.gl/sq/2ea754be-6cc4-4ead-b349-b532d6e363ac', function () {
            if (this.class === "bundle") {
                curDataset = this.Dataset(0);
                console.log('curdataset: ', curDataset);
                drawDashboard();
                getColumnLabels(pivotedData);
            }
            else {
                alert("Wrong dataset format");
            }
        })
    });

// Which chart type should be drawn by default? 
var chartType = 'ColumnChart';

// Array defining with columns (airports) to display on the chart
var allColumns = [];


// changeButtonState sets the buttons class to indicate if a button is pressed or not. 
var changeButtonState = function (id) {
    var element = document.getElementById(id);
    if (element.className == 'series-button series-button-inactive') {
        element.className = 'series-button';
    }
    else {
        element.className = 'series-button series-button-inactive';
    }
}

// Function to change the chart type based on user input from the HTML
changeChartType = function (kind) {
    chartType = kind;

    if (kind != 'PieChart') {
        document.getElementById('airport_picker').style.display = 'none';
        document.getElementById('category_buttons').style.display = 'block';
        document.getElementById('month_picker').style.display = 'none';
        drawDashboard();
    }
    else {
        document.getElementById('category_buttons').style.display = 'none';
        document.getElementById('month_picker').style.display = 'block';
        document.getElementById('airport_picker').style.display = 'block';
        drawPieDashboard();
    }
}

// Load a dataset by inserting an URL and clicking update in the HTML
var changeDatasetUrl = function (inputId, datasetUrl, newChartType) {
    if (newChartType) {
        chartType = newChartType;
    }
    if (!datasetUrl) {
        var datasetUrl = document.getElementById(inputId).value;
    }
    else {
        datasetUrl = datasetUrl;
    }
    
    console.log("InputId: ", inputId + " datasetUrl: ", datasetUrl + " newChartType: ", newChartType)

    JSONstat(datasetUrl, function () {
        if (this.class === "bundle") {
            shownColumns = []; // Reset shown columns, to force calculating number of columns from new dataset
            curDataset = this.Dataset(0);
            series = null; // Reset series to force recalculation of number of series when fetching a new dataset
            console.log(newChartType);
            changeChartType(chartType);
            getColumnLabels(pivotedData);
            location.href = "#chart-wrapper";
        }
        else {
            alert("Something went wrong, when loading the data. Is it a valid URL? Is it JSON-stat?");
        }
    })
}

var getColumnLabels = function (dataset) {
    var categoryPicker = document.getElementById('category_picker');
    var oldCategoryButtons = document.getElementById('category_buttons');
    console.log(oldCategoryButtons);

    var buttonsDiv = document.createElement('div');
    buttonsDiv.setAttribute('id', 'category_buttons');
    for (var i = 2; i < dataset.getNumberOfColumns(); i++) {
        var button = document.createElement('button');
        button.setAttribute('style', 'background: ' + getSeries(i).color);
        button.setAttribute('class', 'series-button');
        button.setAttribute('id', dataset.getColumnLabel(i));
        button.setAttribute('onClick', "toggleColumn(" + (i) + "); changeButtonState('" + dataset.getColumnLabel(i) + "')");
        button.appendChild(document.createTextNode(dataset.getColumnLabel(i)));
        buttonsDiv.appendChild(button);
    }
    categoryPicker.replaceChild(buttonsDiv, oldCategoryButtons);
}