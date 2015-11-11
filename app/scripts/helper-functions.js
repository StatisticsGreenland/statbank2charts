var series = null;

var initSeries = function (numOfSeries) {
    var newSeries = new Object;
    for (var i = 0; i < numOfSeries; i++) {
        newSeries[(i + 2)] = new Object({
            // use colors from array. Repeat from start if theres more series than colors available.
            'color': chartColors[(i % chartColors.length)],
            'show': true
        });
    }
/*    console.log('initSeries ', newSeries);*/
    return newSeries;
}

var getSeries = function(index) {
/*    console.log(series[index]);*/
    return series[index];
}

var getView = function () {
    //console.log("series length ", _.keys(series).length);
    var columns = [];
    var colors = [];
    columns.push(1);
    for (var i = 2; i < _.keys(series).length + 2; i++) {
        if (series[i.toString()].show) {
            columns.push(i);
            colors.push(series[(i.toString())].color);
        }
    }
    return {
        columns: columns,
        colors: colors
    }
}

var toggleSeries = function (seriesIndex) {
/*    console.log('seriesIndex ', seriesIndex, "status: ", series[seriesIndex.toString()].show);*/
    if (series[seriesIndex.toString()].show) {
        series[seriesIndex.toString()].show = false;
/*        console.log('toggled off');*/
    }
    else {
        series[seriesIndex.toString()].show = true;
/*        console.log('toggled on');*/
    }
    return getView();
}

function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    }
    
    
 // Function to change the chart type based on user input from the HTML
function changeChartType(kind) {
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
    document.getElementById('state').value = kind;
}   
    
    
 function graphIt(datasetUrl, chartType) {
    JSONstat(datasetUrl, function () {
        if (this.length) {
            shownColumns = []; // Reset shown columns, to force calculating number of columns from new dataset
            curDataset = this.Dataset(0);
            series = null; // Reset series to force recalculation of number of series when fetching a new dataset
            console.log(chartType);
            changeChartType(chartType);
            getColumnLabels(pivotedData);
            location.href = "#chart-wrapper";
        }
        else {
            alert("Something went wrong, when loading the data. Is it a valid URL? Is it JSON-stat?");
        }
    })
}