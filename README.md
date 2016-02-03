<span style='color:#FFBAD2;'>SWEETCHARTS</span>
============

Sweetcharts is a Chart library designed for the easy and quick building of Animation Web Chart

## Example
[SWEETCHARTS DEMO](http://git.io/hViu) <br />
at this present it only supports a pie chart and Donut chart. :-)


## Usage
```javascript
	var oPy = new SWEETCHARTS._PIE( document.querySelector(".chart-wrap"), {
		core : {
			// centerX:50,  /* default: center */
			// centerY:200, /* default: center */
			radius:150,
			nMilliSecondCycle:500,
			//sRandomColorType : "brightness100b" /*brightness100a,100b,500a*/
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

sweetcharts can be installed using the [Bower](http://bower.io) package manager:
//not ready..


To use sweetcharts in your project, place the following in the `<head>` of your main HTML:
```html
<script src="build/sweet_pie.min.js"></script>
```

HTML
```html
<div class="chart-wrap" style="width:500px; height:400px;position:relative">
	<h3 style="position:absolute;top:0px;left:250px;">My Company Employees stats</h3>
	<svg class="sweet-chart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="width:70%;height:100%;">
	</svg>
	<svg class="sweet-legend" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="width:25%;height:100%;">
	</svg>
</div>
```

## Supported browsers
sweetcharts support the latest versions of the following browsers and platforms. On Windows, we support Internet Explorer 9+.


## License
#### MIT
