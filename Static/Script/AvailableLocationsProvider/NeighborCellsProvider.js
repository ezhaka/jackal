define(['availableLocationsProvider/cellHelper', 'direction'],
  function (CellHelper, Direction) {
    return function (field) {
      this.getNeighborCells = function (movingCapabilities, currentCoords) {
        var availableCoords = [];

        var directionMapping = {};
        directionMapping[Direction.top] = [-1, 0];
        directionMapping[Direction.topRight] = [-1, 1];
        directionMapping[Direction.right] = [0, 1];
        directionMapping[Direction.bottomRight] = [1, 1];
        directionMapping[Direction.bottom] = [1, 0];
        directionMapping[Direction.bottomLeft] = [1, -1];
        directionMapping[Direction.left] = [0, -1];
        directionMapping[Direction.topLeft] = [-1, -1];

        for (var m in directionMapping) {
          if (directionMapping.hasOwnProperty(m)) {
            var offset = directionMapping[m];

            if (!movingCapabilities.direction || Direction.hasDirection(movingCapabilities.direction, m)) {
              availableCoords.push(CellHelper.getAbsoluteCoords(currentCoords, offset));
            }
          }
        }

        return field.getCellsByCoords(availableCoords);
      }
    }
  });