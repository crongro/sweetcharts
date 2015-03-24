'use strict';
require.config({
    baseUrl:"../build",
    paths : {},
    waitSeconds: 15
});

require(["sweet_pie.min", "sweet_donut.min"], function (PIE, Donut) {

    new PIE( document.querySelector(".chartList:first-child > .chart-wrap"), {
        core : {
          // centerX:50, //default: center
          // centerY:200, //default: center 
          radius:150,
          nMilliSecondCycle:500,
          sRandomColorType : "brightness100b" //default: user custom value
        }, 
        htPiece : {
         "Firefox 5+"   : {"data" : 17.67},
         "IE(all)"      : {"data" : 20.78},
         "Chrome(all)"  : {"data" : 46.08}, 
         "safari 7.0"   : {"data" : 10.36},
         "opera"        : {"data" : 2}
       }
    }).runAnimation();

     new PIE( document.querySelector(".chartList:nth-child(2)> .chart-wrap"), {
        core : {
          // centerX:50, //default: center
          // centerY:200, //default: center 
          radius:150,
          nMilliSecondCycle:500,
          sRandomColorType : "" //default: user custom value
        }, 
        htPiece : {
         "Firefox 5+"   : {"data" : 17.67, "color" : "#ECEFF1"},
         "IE(all)"      : {"data" : 20.78, "color" : "#CFD8DC"},
         "Chrome(all)"  : {"data" : 46.08, "color" : "#B0BEC5"}, 
         "safari 7.0"   : {"data" : 10.36, "color" : "#90A4AE"},
         "opera"        : {"data" : 2, "color" : "#78909C"}
       }
    }).runAnimation();


    new Donut( document.querySelector(".chartList:nth-child(3) > .chart-wrap"), {
        core : {
          radius:150,
          nMilliSecondCycle:500,
          sRandomColorType : "brightness500a" //default: user custom value
        }, 
        htPiece : {
         "Project Manager"    : {"data" : 2},
         "DB Developer"       : {"data" : 3},
         "UX Researcher"      : {"data" : 4},
         "Designer"           : {"data" : 5},
         "WEB Developer"      : {"data" : 9},
         "Tester"             : {"data" : 3},
         "salesman"           : {"data" : 5}
       }
      }).runAnimation();
});