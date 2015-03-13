require.config({
    baseUrl:"../js",
    paths : {},
    waitSeconds: 15
});

require([
    "ac_pie"
], function (ANICHART_PIE) {

    // if(!isMobile()) {
    //   var oPy = new ANICHART_PIE( document.querySelector(".row-first > .chart-wrap:first-child"), {
    //     core : {
    //       // centerX:50, //default: center
    //       // centerY:200, //default: center 
    //       radius:150,
    //       nMilliSecondCycle:500,
    //       //sRandomColorType : "c" //default: user custom value
    //     }, 
    //     htPiece : {
    //      "Chrome(all)"  : {"data" : 46.08, "color" : "green"},
    //      "Firefox 5+"   : {"data" : 17.67, "color" : "orange"},
    //      "IE(all)"      : {"data" : 20.78, "color" : "dodgerblue"},
    //      "safari 7.0"   : {"data" : 10.36, "color" : "skyblue"},
    //      "opera"        : {"data" : 2, "color" : "red"},
    //    }
    //  }).runAnimation();

    //   var oPy2 = new ANICHART_PIE( document.querySelector(".row-first > .chart-wrap:last-child "), {
    //     core : {
    //       // centerX:50, //default: center
    //       // centerY:200, //default: center 
    //       radius:150,
    //       nMilliSecondCycle:500,
    //       sRandomColorType : "a" //default: user custom value
    //     }, 
    //     htPiece : {
    //      "WEBUI"          : {"data" : 23, "color" : "red"},
    //      "WEBServer"      : {"data" : 13, "color" : "blue"},
    //      "DBMaster"       : {"data" : 3,  "color" : "grey"},
    //      "ProjectManager" : {"data" : 43.3, "color" : "green"},
    //      "ProjectManager2" : {"data" : 63.3, "color" : "green"},
    //      "ProjectManager3" : {"data" : 23.3, "color" : "green"},
    //      "Designer"       : {"data" : 13, "color" : "magenta"},
    //      "Designer2"       : {"data" : 23, "color" : "magenta"},
    //      "Designer3"       : {"data" : 33, "color" : "magenta"},
    //    }
    //  }).runAnimation();

    //   var oPy3 = new ANICHART_PIE( document.querySelector(".row-second > .chart-wrap:first-child "), {
    //     core : {
    //       // centerX:50, //default: center
    //       // centerY:200, //default: center 
    //       radius:150,
    //       nMilliSecondCycle:300,
    //       sRandomColorType : "b" //default: user custom value
    //     }, 
    //     htPiece : {
    //      "WEBUI"          : {"data" : 33, "color" : "red"},
    //      "WEBServer"      : {"data" : 23, "color" : "blue"},
    //      "DBMaster"       : {"data" : 3,  "color" : "grey"},
    //      "DBMaster2"       : {"data" : 33,  "color" : "grey"},
    //      "DBMaster3"       : {"data" : 13,  "color" : "grey"},
    //      "ProjectManager" : {"data" : 13.3, "color" : "green"},
    //      "ProjectManager2" : {"data" : 33.3, "color" : "green"},
    //      "ProjectManager3" : {"data" : 13.3, "color" : "green"},
    //      "Designer"       : {"data" : 33, "color" : "magenta"},
    //      "Designer2"       : {"data" : 43, "color" : "magenta"},
    //      "Designer3"       : {"data" : 63, "color" : "magenta"},
    //    }
    //  }).runAnimation();
    // }

    var oPy4 = new ANICHART_PIE( document.querySelector(".row-second > .chart-wrap:last-child "), {
        core : {
          // centerX:50, //default: center
          // centerY:200, //default: center 
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