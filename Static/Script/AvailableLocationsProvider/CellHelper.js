define(function () {
  return {
    getAbsoluteCoords: function (currentCoords, offset) {
      return [currentCoords[0] + offset[0], currentCoords[1] + offset[1]];
    }
  }
});