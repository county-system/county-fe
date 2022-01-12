function sumUnic(arr, name, sumName) {
  var returnArr = [];
  var obj = arr;
  for (var x = 0; x < obj.length; x++) {
    if (
      (function (source) {
        if (returnArr.length == 0) {
          return true;
        } else {
          for (var y = 0; y < returnArr.length; y++) {
            var isThere = [];
            if (returnArr[y][name] == source[name]) {
              returnArr[y][sumName] =
                parseInt(returnArr[y][sumName]) + parseInt(source[sumName]);
              return false;
            } else {
              isThere.push(source);
            }
          }
          if (isThere.length > 0) returnArr.push(source);
          return false;
        }
      })(obj[x])
    ) {
      returnArr.push(obj[x]);
    }
  }
  return returnArr;
}

export { sumUnic };
