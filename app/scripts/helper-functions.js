

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
    console.log('initSeries ', newSeries);
    return newSeries;
}

var getSeries = function(index) {
    console.log(series[index]);
    return series[index];
}

var getView = function () {
    console.log("series length ", _.keys(series).length);
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
    console.log('seriesIndex ', seriesIndex, "status: ", series[seriesIndex.toString()].show);
    if (series[seriesIndex.toString()].show) {
        series[seriesIndex.toString()].show = false;
        console.log('toggled off');
    }
    else {
        series[seriesIndex.toString()].show = true;
        console.log('toggled on');
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