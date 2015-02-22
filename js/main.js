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
          centerX:200,
          centerY:200,
          radius:150,
          nMilliSecondCycle:1000,
          aColorType : "a"
        }, 
        //piece : [15, 13, 20, 30, 12, 23]
        htPiece : {"WEBUI" : 13, "WEBServer" : 25, "GameClient" : 10, "GameServer" : 5, "Mobile" : 12}
    }).runAnimation();

    var oPy2 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(2) svg"), {
        core : {
          centerX:200,
          centerY:200,
          radius:150,
          nMilliSecondCycle:500,
          aColorType : "b"
      }, 
      htPiece : {"WEBUI" : 13, "WEBServer" : 25, "GameClient" : 10, "GameServer" : 5, "Mobile" : 12}
    }).runAnimation();

    var oPy3 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(3) svg"), {
        core : {
          centerX:200,
          centerY:200,
          radius:150,
          nMilliSecondCycle:500,
          aColorType : "c"
      }, 
      htPiece : {"WEBUI" : 13, "WEBServer" : 25, "GameClient" : 10, "GameServer" : 5, "Mobile" : 12}
    }).runAnimation();

    var oPy4 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(4) svg"), {
        core : {
          centerX:200,
          centerY:200,
          radius:150,
          nMilliSecondCycle:500,
          aColorType : "d"
      }, 
      htPiece : {"WEBUI" : 13, "WEBServer" : 25, "GameClient" : 10, "GameServer" : 5, "Mobile" : 12, "Design" : 20, "UX" : 20, "기획" : 12, "EP" : 22, "QA" : 29, "PM" : 9}
    }).runAnimation();

});