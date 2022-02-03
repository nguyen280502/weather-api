module.exports = {
  isEmpty: function (input) {
    if(input.trim() === '') {
      console.log("input: false" + input);
      return true;
    } else {
      console.log("input: true" + input);
      return false;
    }
  },
  bar: function () {
    // whatever
  }
};

var foo = function () {
}
