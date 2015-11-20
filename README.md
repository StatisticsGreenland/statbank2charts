# README #

This repository contains a commented code-example of using data from StatBank Greenland  (http://bank.stat.gl/pxweb/en/Greenland/) for data visualisations. 

**Live example:** [http://www.stat.gl/demo](http://www.stat.gl/demo)


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

* To use the visualisations "as is" the data should have at least 2 dimensions:
 
time (e.g. year, numeric)  
and one dimension with multiple categories (2-6 values looks nice)  
from other dimensions in a datacube 0 or 1 value can be selected  
  
Sortorder is calculated from the role ‘time’ found in the JSON-STAT file  

Note

Not all files in the Greenlandic Statbank can be used. If this is to be used with other PX-Web based Statbanks CORS must be enabled on the server as well as ‘saved queries’, JSON-STAT and TIMEVAL must be declared

**Table 1**
![Screen Shot 2015-09-28 at 10.31.10.png](/3556998481-Screen%20Shot%202015-09-28%20at%2010.31.10.png)

**Table 1 pivoted**
![Screen Shot 2015-09-28 at 10.29.42.png](/1363508627-Screen%20Shot%202015-09-28%20at%2010.29.42.png)
