
**Anichart is a Chart library designed for the easy and quick building of Animation web Chart.**
at this present it only supports a pie chart.

# Base Usage

	var oPy = new ANICHART_PIE( document.querySelector(".row-first > .chart-wrap:first-child"), {
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
