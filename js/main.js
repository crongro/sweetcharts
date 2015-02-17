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
        }, 
        piece :
        [[15,'magenta'], [13,'skyblue'], [20,'#fff'], [55,'orange'],[15,'yellow'],[15,'green'], [35,'brown']]
    }).runAnimation();

    var oPy2 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(2) svg"), {
        core : {
          centerX:200,
          centerY:200,
          radius:150,
          nMilliSecondCycle:500,
      }, 
      piece :
      [[2,'#f0e'], [15,'magenta'],[25,'#f32'],[35,'green'], [15,'brown'], [3,'skyblue'],[15,'gray'] ]
    }).runAnimation();

    var oPy3 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(3) svg"), {
        core : {
          centerX:200,
          centerY:200,
          radius:150,
          nMilliSecondCycle:1000,
      }, 
      piece :
      [[2,'#f0e'], [15,'orange'],[205,'#f32'],[25,'green'], [150,'brown'], [30,'skyblue'],[150,'gray'] ]
    }).runAnimation();

    var oPy3 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(4) svg"), {
        core : {
          centerX:200,
          centerY:200,
          radius:150,
          nMilliSecondCycle:1500,
      }, 
      piece :
      [[2,'#f0e'], [15,'orange'],[25,'#f32'],[25,'green'], [15,'brown'], [3,'skyblue'],[15,'gray'] ]
    }).runAnimation();
});