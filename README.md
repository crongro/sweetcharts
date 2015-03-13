ANIChart.js
============

Anichart is a Chart library designed for the easy and quick building of Animation Web Chart.

## Example
[PIE Chart Example](http://git.io/pyD4) <br />
at this present it only supports a pie chart.


## Usage
```javascript
	var oPy = new ANICHART_PIE( document.querySelector(".chart-wrap"), {
		core : {
			// centerX:50,  /* default: center */
			// centerY:200, /* default: center */
			radius:150,
			nMilliSecondCycle:500,
			//sRandomColorType : "c"  /* a~d, default: htPiece color attribute */
		}, 
		htPiece : {
			"Chrome(all)"  : {"data" : 46.08, "color" : "green"},
			"Firefox 5+"   : {"data" : 17.67, "color" : "orange"},
			"IE(all)"      : {"data" : 20.78, "color" : "dodgerblue"},
			"safari 7.0"   : {"data" : 10.36, "color" : "skyblue"},
			"opera"        : {"data" : 2, "color" : "red"},
		}
	}).runAnimation();
```

## Install

ANIChart can be installed using the [Bower](http://bower.io) package manager:
//not ready..


To use ANIChart in your project, place the following in the `<head>` of your main HTML:
```html
<script src="/lib/ac_pie.js"></script>
```

HTML
```html
<div class="chart-wrap" style="width:500px; height:400px;">
  <svg class="ani-chart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  </svg> 
  <svg class="ani-legend" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  </svg>
</div>
```

CSS
```css
<style type="text/css" media="screen">
	.ani-chart {width: 70%; height: 100%;} .ani-legend {width: 25%; height: 100%;}
</style>
```

JavaScript
```javascript 
var oPy = new ANICHART_PIE( document.querySelector(".chart-wrap"), {
		core : {
			// centerX:50,  /* default: center */
			// centerY:200, /* default: center */
			radius:150,
			nMilliSecondCycle:500,
			//sRandomColorType : "c"  /* a~d, default: htPiece color attribute */
		}, 
		htPiece : {
			"Chrome(all)"  : {"data" : 46.08, "color" : "green"},
			"Firefox 5+"   : {"data" : 17.67, "color" : "orange"},
			"IE(all)"      : {"data" : 20.78, "color" : "dodgerblue"},
			"safari 7.0"   : {"data" : 10.36, "color" : "skyblue"},
			"opera"        : {"data" : 2, "color" : "red"},
		}
	}).runAnimation();
```

## Supported browsers
ANIChart support the latest versions of the following browsers and platforms. On Windows, we support Internet Explorer 9+.

