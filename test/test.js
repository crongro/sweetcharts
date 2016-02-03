var assert = require("assert")
var should = require('should');

// describe('ArrayOne', function(){
//     describe('#indexOf()', function(){
//         it('should return -1 when the value is not present', function(){
//              assert.equal(-1, [1,2,3].indexOf(0));
//              assert.equal(-1, [1,2,3].indexOf(5));
//             // assert.equal(-1, [1,2,3].indexOf(5));
//         })
//     })
// })
describe("should.js Test1", function(){
    beforeEach(function(){
        console.log("test 를 실행합니다.");
    })

    describe("previous", function(){
       it('should return -1 when the value is not present', function(){
          [1,2,3].indexOf(5).should.equal(-1);
      })
   })
});

describe("should.js Test2", function(){

    describe("base", function(){
       it('should return -1 when the value is not present', function(){
          [1,2,3].indexOf(5).should.equal(-1);
          [1,2,3].indexOf(0).should.equal(-1);
          assert.equal(true, true);
      })
       it('should equal true test result', function(){
          should.equal(true, true, "두개가 같다"); 
          (true).should.be.true;
       })
       it('async Test', function(){
          should.equal(true, true, "두개가 같다"); 
          (true).should.be.true;
          setTimeout(function(){console.log(3);},100)
       })
    })

})



// describe('a suite of tests', function(){
//   this.timeout(500);

//   it('should take less than 500ms', function(done){
//     setTimeout(done, 300);
//   })

//   it('should take less than 500ms as well', function(done){
//     setTimeout(done, 200);
//   })
// })

