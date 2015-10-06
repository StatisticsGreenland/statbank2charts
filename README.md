# README #

This repository contains a commented code-example of using data from StatBank Greenland  (http://bank.stat.gl/pxweb/en/Greenland/) for data visualisations. 

**Live example:** [demosites.kathart.dk/stat-gl](http://demosites.kathart.dk/stat-gl)


## What is this repository for? ##
* Data visualisations 
* The code examples use [google visualization](https://developers.google.com/chart/), but you are free to use any data visualisation framework you feel comfortable with.


## How do I get set up? ##
* Copy the contents of the app-folder to a server or run it locally.

## External libraries documentation ##
* JSON-stat JavaScript ToolKit: http://json-stat.com/, documentation: https://github.com/badosa/JSON-stat/wiki
* Google Charts: https://developers.google.com/chart/
* Pure.css for basic styling: http://purecss.io/ (may be omitted). 

## Dataset requirements ##
* The data needs to be of the format JSONstat. Data-feeds are can be created at [http://bank.stat.gl/](http://bank.stat.gl/pxweb/en/Greenland/)
* To use the visualisations "as is" the data should have 3 dimensions: 

1. time (e.g. year, numeric) 

2. category (e.g. airport) 

3. category (e.g. month)

* **The first column in the table must always be time.** When editing the table on bank.stat.gl, it is possible to pivot the dataset manually to place *dimension 1* (time) as rows and the remaining dimensions as columns. 

### Pie chart ###
* In the pie chart *dimension 2 and 3* are used to filter the data. 

### Line and bar chart ###
In the line and bar chart the dataset is pivoted, with each unique value in dimension 2 used as a column in the table.
* *dimension 1* is aggregated into one row for each unique time stamp (e.g. rows: 2001, 2002, 2003, ..) 
* *dimension 2* is used to form the categories. 
* *dimension 3* is lost during pivoting, in the sense that all data belonging to that specific time stamp and category (*from dimension 2*) is summed up to a single value. See illustrations (table 1 and table 1 pivoted) for reference.

**Table 1**
![Screen Shot 2015-09-28 at 10.31.10.png](https://bitbucket.org/repo/BaERxR/images/3556998481-Screen%20Shot%202015-09-28%20at%2010.31.10.png)

**Table 1 pivoted**
![Screen Shot 2015-09-28 at 10.29.42.png](https://bitbucket.org/repo/BaERxR/images/1363508627-Screen%20Shot%202015-09-28%20at%2010.29.42.png)


## Who do I talk to? ##
* Lars Pedersen from Statistics Greenland