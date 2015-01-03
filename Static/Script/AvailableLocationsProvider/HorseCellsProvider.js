define(['/cellHelper'],
  function (CellHelper) {
    return function (field) {
      this.getHorseCells = function (currentCoords) {
        var offsets = [
          [2, 1], [1, 2], [-2, 1], [-1, 2], [-2, -1], [-1, -2], [2, -1], [1, -2]
        ];

        var availableCoords = offsets.map(function (offset) {
          return CellHelper.getAbsoluteCoords(currentCoords, offset);
        });

        return field.getCellsByCoords(availableCoords);
      }
    }
  });