var htmlStrings = [
  '<p class="targetClassName"></p>',
  '<p class="otherClassName targetClassName"></p>',
  '<p><p class="targetClassName"></p></p>',
  '<p><p class="targetClassName"><p class="targetClassName"></p></p></p>',
  '<p><p></p><p><p class="targetClassName"></p></p></p>',
  '<p><p class="targetClassName"></p><p class="targetClassName"></p></p>',
  '<p><div class="somediv"><div class="innerdiv"><span class="targetClassName">yay</span></div></div></p>'
];

describe('getElementsByClassName', function(){

  it('should match the results of calling the built-in function', function(){
    $('body').addClass('targetClassName');
    htmlStrings.forEach(function(htmlString){
      var $rootElement = $(htmlString);
      $('body').append($rootElement);

      var result = getElementsByClassName('targetClassName');
      var expectedNodeList = document.getElementsByClassName('targetClassName');
      var expectedArray = Array.prototype.slice.apply(expectedNodeList);
      var equality = _.isEqual(result, expectedArray); // why can't we use `===` here?
      expect(equality).to.equal(true);

      $rootElement.remove();
    });
    $('body').removeClass('targetClassName');
  });

});

getElementsByClassName = function(name) {
  
  var res = [];
  res.push(document.body);
  var nodes = document.body.childNodes
  adder = function(x) {
    for (var i = 0; i < x.length; i++) {
      //console.log(x[i].classList);
      if (x[i].classList != undefined) {
        nodes = x[i].childNodes;
        adder(nodes);
        if ($.inArray(name, x[i].classList) != -1) {
          res.push(x[i]);
        }
      }
    }
  }
  adder(nodes);
  //console.log(res); 

  return res;
}
