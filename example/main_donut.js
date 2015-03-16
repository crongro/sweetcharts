require.config({
    baseUrl:"../js",
    paths : {},
    waitSeconds: 15
});

require([
    "ac_donut"  //call 'ac_donut.js'
], function (Donut) {

    var oPy = new Donut( document.querySelector(".row-first > .chart-wrap:first-child "), {
        core : {
          radius:150,
          nMilliSecondCycle:500,
          sRandomColorType : "c" //default: user custom value
        }, 
        htPiece : {
                   "WEBUI"          : {"data" : 33, "color" : "red"},
                   "WEBServer"      : {"data" : 23, "color" : "blue"},
                   "DBMaster"       : {"data" : 3,  "color" : "grey"},
                   "DBMaster2"       : {"data" : 33,  "color" : "grey"},
                   "DBMaster3"       : {"data" : 13,  "color" : "grey"},
                   "ProjectManager" : {"data" : 13.3, "color" : "green"},
                   "ProjectManager2" : {"data" : 33.3, "color" : "green"},
                   "ProjectManager3" : {"data" : 13.3, "color" : "green"},
                   "Designer"       : {"data" : 33, "color" : "magenta"},
                   "Designer2"       : {"data" : 43, "color" : "magenta"},
                   "Designer3"       : {"data" : 63, "color" : "magenta"},
                 }
    }).runAnimation();

    function isMobile() {
      function isMobileAgent() {
        return !! (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
      }
      function isMobileWidth() {
        return !! (window.innerWidth < 401);
      }
      return !! (isMobileAgent() && isMobileWidth());
    }
});