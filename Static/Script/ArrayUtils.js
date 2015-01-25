define({
  mapMany: function (arr, func) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {
      var subResult = func(arr[i]);
      for (var j = 0; j < subResult.length; j++) {
        result.push(subResult[j]);
      }
    }

    return result;
  }
});