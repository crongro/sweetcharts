require.config({
    baseUrl:"/js",
    paths : {},
    waitSeconds: 15
});

require([
    "ac_pie"
], function (ANICHART_PIE) {
    var oPy = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(1) svg"), {
        core : {
          // centerX:50, //default: center
          // centerY:200, //default: center 
          radius:150,
          nMilliSecondCycle:500,
          //sRandomColorType : "c" //default: user custom value
        }, 
        htPiece : {
                   "WEBUI"          : {"data" : 23, "color" : "red"},
                   "WEBServer"      : {"data" : 13, "color" : "blue"},
                   "DBMaster"       : {"data" : 3,  "color" : "grey"},
                   "ProjectManager" : {"data" : 33.3, "color" : "green"},
                   "Designer"       : {"data" : 63, "color" : "magenta"},
                 }
    }).runAnimation();

    var oPy2 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(2) svg"), {
        core : {
          // centerX:50, //default: center
          // centerY:200, //default: center 
          radius:250,
          nMilliSecondCycle:1000,
          sRandomColorType : "c" //default: user custom value
        }, 
        htPiece : {
                   "WEBUI"          : {"data" : 23, "color" : "red"},
                   "WEBServer"      : {"data" : 13, "color" : "blue"},
                   "DBMaster"       : {"data" : 3,  "color" : "grey"},
                   "ProjectManager" : {"data" : 43.3, "color" : "green"},
                   "ProjectManager2" : {"data" : 63.3, "color" : "green"},
                   "ProjectManager3" : {"data" : 23.3, "color" : "green"},
                   "Designer"       : {"data" : 13, "color" : "magenta"},
                   "Designer2"       : {"data" : 23, "color" : "magenta"},
                   "Designer3"       : {"data" : 33, "color" : "magenta"},
                 }
    }).runAnimation();

    // var oPy2 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(2) svg"), {
    //     core : {
    //       centerX:200,
    //       centerY:200,
    //       radius:150,
    //       nMilliSecondCycle:500,
    //       aColorType : "b"
    //   }, 
    //   htPiece : {"WEBUI" : 13, "WEBServer" : 25, "GameClient" : 10, "GameServer" : 5, "Mobile" : 12}
    // }).runAnimation();

    // var oPy3 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(3) svg"), {
    //     core : {
    //       centerX:200,
    //       centerY:200,
    //       radius:150,
    //       nMilliSecondCycle:500,
    //       aColorType : "c"
    //   }, 
    //   htPiece : {"WEBUI" : 13, "WEBServer" : 25, "GameClient" : 10, "GameServer" : 5, "Mobile" : 12}
    // }).runAnimation();

    // var oPy4 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(4) svg"), {
    //     core : {
    //       centerX:200,
    //       centerY:200,
    //       radius:150,
    //       nMilliSecondCycle:500,
    //       aColorType : "d"
    //   }, 
    //   htPiece : {"WEBUI" : 13, "WEBServer" : 25, "GameClient" : 10, "GameServer" : 5, "Mobile" : 12, "Design" : 20, "UX" : 20, "기획" : 12, "EP" : 22, "QA" : 29, "PM" : 9}
    // }).runAnimation();

});