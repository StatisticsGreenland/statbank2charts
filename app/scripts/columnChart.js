// Callback that creates and populates a data table,
// instantiates a dashboard, a range slider and a pie chart,
// passes in the data and draws it.
function drawDashboard() {
  var dataset = curDataset;

  document.getElementById('label').innerHTML = dataset.Dataset(0).label;
  document.getElementById('source').innerHTML = dataset.Dataset(0).source;

  var columnLabels = getVarLabels(dataset, data);
  console.log("ColLabels: ", columnLabels);

  // The JSONStat-dataset is formatted into a dataTable which plays nice with googles chart library.
  var tbl = dataset.toTable({
    type: "object"
  });

  // The newly created datatable is used as input to a google visualization dataTable. 0.6 indicates the api-version.
  var data = new google.visualization.DataTable(tbl, 0.6);

  var timeColumnIndex = data.getColumnIndex(dataset.role.time[0]);
  var multiColumnIndex = data.getColumnIndex(dataset.role.classification[0]);
  var lastColumnIndex = dataset.length;
  // console.log('classificationvariable: ', getVarLabels(dataset, data));

  data.addColumn({
    type: 'string',
    role: 'style'
  });
  // Pivoting the data
  var distinctValues = data.getDistinctValues(data.getColumnIndex(getVarLabels(dataset, data).multi)); // get an array of distinct values in column 0 (possible values for airport)
  var viewColumns = [timeColumnIndex]; // Set the time-column (years) as the first column in the view
  var groupColumns = [];
  var classificationIndex = data.getColumnIndex(getVarLabels(dataset, data).multi);

  // build column arrays for the view and grouping
  for (var i = 0; i < distinctValues.length; i++) {
    viewColumns.push({
      type: 'number',
      label: distinctValues[i],
      calc: (function(x) {
        // console.log("calc X: ", x);
        return function(dt, row) {
          // return values of C only for the rows where B = distinctValues[i] (passed into the closure via x)
          return (dt.getValue(row, classificationIndex) == x) ? dt.getValue(row, lastColumnIndex) : null;
        }
      })(distinctValues[i])
    });

    groupColumns.push({
      column: i + 1, // start at column 1, as column 0 is reserved for the time variable
      type: 'number',
      label: distinctValues[i],
      aggregation: google.visualization.data.sum
    });

  }

  // Create a google visualization DataView to hold the data.
  //The view is read-only and allows selecting only a subset of the data as well as reordering columns/rows
  var view = new google.visualization.DataView(data);
  view.setColumns(viewColumns);

  // next, we group the view on column A, which gets us the pivoted data
  pivotedData = google.visualization.data.group(view, [0], groupColumns);
  pivotedData.insertColumn(0, 'number', columnLabels.time);

  // copy values from column 1 (old column 0) to column 0, converted to numbers
  for (var i = 0; i < pivotedData.getNumberOfRows(); i++) {
    var noRangeSlider = 0;
    var val = pivotedData.getValue(i, 1);
    console.log("val: ", new Number(val).valueOf());
    if (val != '' && val != null && !isNaN(new Number(val).valueOf())) {
      pivotedData.setValue(i, 0, new Number(val).valueOf());
    } else {
      noRangeSlider++;
    }
  }


  // Calculate how many data-series the pivoted data has.
  if (!series) {
    series = initSeries(pivotedData.getNumberOfColumns() - 2); // disregard column 0 and 1 (they are used for the time-dimension)
    ////console.log(series);
  }

  // Set the chart view options
  init = getView();
  shownColumns = init.columns;
  curChartColors = init.colors;


  // Use the pivoted dataset for the chart
  var chartData = pivotedData;

  // Create a dashboard to hold
  var dashboard = new google.visualization.Dashboard(
    document.getElementById('dashboard_div'));

  if (noRangeSlider) {
    var timePicker = new google.visualization.ControlWrapper({
        'controlType': 'CategoryFilter',
        'containerId': 'time_picker',
        'options': {
            'filterColumnIndex': timeColumnIndex-1,
            'ui': {
                'labelStacking': 'vertical',
                'allowTyping': true,
                'allowMultiple': true,
                'sortValues': false,
                'cssClass': 'styled-category-filter',
                'allowNone': false
            },
        },
        // 'state': {
        //     'selectedValues': ['2014']
        // }
    });
  } else {
    var timePicker = new google.visualization.ControlWrapper({
      'controlType': 'NumberRangeFilter',
      'containerId': 'time_picker',
      'options': {
        'filterColumnLabel': columnLabels.time,
        'ui': {
          'labelStacking': 'vertical',
          'labelSeparator': ':',
          'format': {
            'pattern': '####'
          }
        }
      }
    });
  }

  // Create a  chart, passing some options
  var chart = new google.visualization.ChartWrapper({
    'chartType': chartType,
    'containerId': 'chart_div',
    'options': {
      'width': '100%',
      'height': 200,
      'legend': 'none',
      'isStacked': true,
      'colors': curChartColors
    },
    'view': {
      'columns': shownColumns
    }
  });

  // Establish dependencies, declaring that timePicker, monthPicker and airportPicker drives 'pieChart',
  // so that the pie chart will only display entries that are let through these filters.
  dashboard.bind(timePicker, chart);
  // Draw the dashboard.
  dashboard.draw(chartData);

  document.getElementById('classification').innerHTML = getVarLabels(dataset, data).multi;


  // Make sure the chart is redrawn, whenever the window is resized.
  window.addEventListener('resize', function() {
    dashboard.draw(chartData)
  }, true);
}
