define(function () {
  return {
    getCellsByCoords: function (coordsList, cells) {
      return cells.filter(function (cell) {
        var cellCoords = cell.coords();
        var matchFound = false;

        coordsList.forEach(function (coords) {
          if (coords[0] == cellCoords[0] && coords[1] == cellCoords[1]) {
            matchFound = true;
          }
        });

        return matchFound;
      })
    },
    getAbsoluteCoords: function (currentCoords, offset) {
      return [currentCoords[0] + offset[0], currentCoords[1] + offset[1]];
    }
  }
});