// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  // your code goes here
  
  
  var output = "";
  if (typeof(obj) === "object") {
    if(!obj) { return "null" }
    
    var isObjectLiteral = ( Object.getPrototypeOf(obj) === Object.getPrototypeOf({}) );
  
    
    if (isObjectLiteral) {
      output += "{";
      for (var key in obj) {
        var item = stringifyJSON(obj[key]);
        if (!(typeof item === 'undefined')) {
          output += "\""+key+"\":" + stringifyJSON(obj[key]) + ",";
        }
      }
      // remove extra comma
      if (output.length>1) {
        output = output.slice(0,output.length-1);
      }
      output += "}";
      return output;
    } 
  
    else if (Array.isArray(obj)) {
      output += "["
      obj.forEach(function(item) {
        var value = stringifyJSON(item);
        if (!(typeof item === 'undefined')) {
          output += stringifyJSON(item) + ",";
        }
      });
      // remove extra comma
      if (output.length>1) {
        output = output.slice(0,output.length-1);
      }
      output += "]"
      return output;
    }
  }
  
  // not object literal or array
  switch (typeof obj) {
    case "string": 
      output = "\"" + obj + "\"";
      break;
    case "undefined":
      output = undefined;
      break;
    case "function":
      output = undefined;
      break;
    default:
      output = obj.toString();
  }
  
  return output;
};
