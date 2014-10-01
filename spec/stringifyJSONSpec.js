// test cases are described in fixtures.js
describe('stringifyJSON', function(){
  it('should match the result of calling JSON.stringify', function(){

    stringifiableObjects.forEach(function(test){
      var result = stringifyJSON(test);
      var expected = JSON.stringify(test);
      expect(result).to.equal(expected);
    });

    unstringifiableValues.forEach(function(obj){
      var result = stringifyJSON(obj);
      var expected = JSON.stringify(obj);
      expect(result).to.equal(expected);
    });

  });
});

stringifyJSON = function(val) {
  //console.log(val);
  if (typeof val === 'number') {
    return val.toString();
  }
  else if (val === null) {
    return 'null';
  }
  else if (val === true) {
    return 'true';
  }
  else if (val === false) {
    return 'false';
  }
  else if (typeof val === 'string') {
    return "\"" +val + "\"";
  }
  else if (val === undefined || typeof val === 'function') {
    return "";
  }
  else if (typeof val === 'object') {
    if (val.length === undefined) {
      if (jQuery.isEmptyObject(val)) {
        return '{}';
      } else {
        var str = "{";
        var isFirst = true;
        for (var i in val) {
          if (stringifyJSON(val[i]) != "") {
            if (isFirst) {
              isFirst = false;
            } else {
              str += ",";
            }
            str += stringifyJSON(i) +":" + stringifyJSON(val[i]); 
          }
        }
      return str + '}';
      }
    }
    else if (val.length === 0) {
      return '[]';
    }
    else {
      var str = "[";
      for (var i in val) {
        if (stringifyJSON(val[i]) != "") {
          if (i != 0) {
            str += ",";
          }
          str += stringifyJSON(val[i]);
        }
      }
      return str + ']';
    }
  }
  //return val;
}