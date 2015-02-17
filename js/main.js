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
          radius:200,
          nMilliSecondCycle:500,
          colorType : "b"
      }, 
      piece : [15, 33, 10, 30, 42, 73]
    }).runAnimation();

    // var oPy3 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(3) svg"), {
    //     core : {
    //       centerX:200,
    //       centerY:200,
    //       radius:150,
    //       nMilliSecondCycle:1000,
    //   }, 
    //   piece :
    //   [[2,'#f0e'], [15,'orange'],[205,'#f32'],[25,'green'], [150,'brown'], [30,'skyblue'],[150,'gray'] ]
    // }).runAnimation();

    // var oPy3 = new ANICHART_PIE( document.querySelector(".pieWrap:nth-child(4) svg"), {
    //     core : {
    //       centerX:200,
    //       centerY:200,
    //       radius:150,
    //       nMilliSecondCycle:1500,
    //   }, 
    //   piece :
    //   [[2,'#f0e'], [15,'orange'],[25,'#f32'],[25,'green'], [15,'brown'], [3,'skyblue'],[15,'gray'] ]
    // }).runAnimation();
});