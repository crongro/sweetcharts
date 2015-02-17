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
          colorType : "a"
        }, 
        piece : [15, 13, 20, 30, 12, 23]
    }).runAnimation();

    var oPy2 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(2) svg"), {
        core : {
          centerX:200,
          centerY:200,
          radius:150,
          nMilliSecondCycle:500,
          colorType : "b"
      }, 
      piece : [15, 33, 10, 30, 42, 73]
    }).runAnimation();

    var oPy3 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(3) svg"), {
        core : {
          centerX:200,
          centerY:200,
          radius:150,
          nMilliSecondCycle:500,
          colorType : "c"
      }, 
      piece : [15, 33, 10, 30, 42, 73]
    }).runAnimation();

    var oPy4 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(4) svg"), {
        core : {
          centerX:200,
          centerY:200,
          radius:150,
          nMilliSecondCycle:500,
          colorType : "d"
      }, 
      piece : [15, 33, 10, 30, 42, 73]
    }).runAnimation();

    var oPy5 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(5) svg"), {
        core : {
          centerX:200,
          centerY:200,
          radius:150,
          nMilliSecondCycle:500,
          colorType : "e"
      }, 
      piece : [15, 33, 10, 30, 42, 73]
    }).runAnimation();
});