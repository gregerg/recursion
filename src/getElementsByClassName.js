// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, element){
  // default element is body
  element = typeof element !== 'undefined' ? element : document.body;
  
  // initialize HTMLCollection to be returned
  var output = $.makeArray();
  
  // ignore text nodes
  if (element.toString() !== '[object Text]') {
    // check/add current element to HTMLCollection
    if(element.classList.contains(className)) {
      output.push(element);
    }
  
    // parse child nodes if there are any
    if(element.childNodes.length > 0) {
      var childOut = $.makeArray();
      [].forEach.call(element.childNodes, function(item) {
        // temp array for recursive call
        childOut = getElementsByClassName(className, item);
        // add to output if recursion yielded anything
        if (childOut.length > 0) {
          [].forEach.call(childOut, function(child) { output.push(child); });
        }
      });
    }
    
  }
  
  return output;
};
