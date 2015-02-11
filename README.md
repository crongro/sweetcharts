# WebAnimationDemo
web animation demo 모음



# require.js usage

	require(["ac_pie"], function (ANICHART_PIE) {
    	var oPy = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(1) svg"), {
	        core : {
		        centerX:200,
		        centerY:200,
		        radius:150,
		        nMilliSecondCycle:1000,
	        }, 
	        piece :
	        [[15,'magenta'], [3,'skyblue'], [37,'#fff'], [45,'green']]
	   	}).runAnimation();
	});


    

    
    



