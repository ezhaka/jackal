define(['movingCapabilites', 'direction', 'cells/cellContentType'],
  function (MovingCapabilites, Direction, CellContentType) {
    return function (model) {
      var pThis = this,
        cells = model.cells;

      pThis.getAvailableCells = getAvailableCells;

      function getAvailableCells(pirateId, pirateCell) {
        var availableCells = getAvailableByCurrentCellType(pirateId, pirateCell);
        // todo: filter by another pirates...
        availableCells = filterByWater(pirateCell, availableCells);
        return availableCells;
      }

      function getAvailableByCurrentCellType(pirateId, pirateCell) {
        var currentCoords = pirateCell.coords();
        var movingCapabilities = pirateCell.getMovingCapabilities(pirateId);

        if (movingCapabilities.type == MovingCapabilites.neighbor
          || movingCapabilities.type == MovingCapabilites.water) {
          return getNeighborCells(movingCapabilities, currentCoords);
        }

        if (movingCapabilities.type == MovingCapabilites.horse) {
          return getHorseCells(currentCoords);
        }

        throw new Error('Unknown moving capabilities type: ' + movingCapabilities.type);
      }

      function filterByWater(pirateCell, availableCells) {
        if (pirateCell.getContent().getContentType() == CellContentType.water) {
          return availableCells.filter(function (c) {
            return c.getContent() ? c.getContent().getContentType() == CellContentType.water : false;
          });
        }

        return availableCells.filter(function (c) {
          return c.getContent() ? c.getContent().getContentType() != CellContentType.water : true;
        });
      }

      function getNeighborCells(movingCapabilities, currentCoords) {
        var availableCoords = [];

        var directionMapping = {};
        directionMapping[Direction.top] = [0, 1];
        directionMapping[Direction.topRight] = [1, 1];
        directionMapping[Direction.right] = [1, 0];
        directionMapping[Direction.bottomRight] = [1, -1];
        directionMapping[Direction.bottom] = [0, -1];
        directionMapping[Direction.bottomLeft] = [-1, -1];
        directionMapping[Direction.left] = [-1, 0];
        directionMapping[Direction.topLeft] = [-1, 1];

        for (var m in directionMapping) {
          if (directionMapping.hasOwnProperty(m)) {
            var offset = directionMapping[m];

            if (!movingCapabilities.direction || Direction.hasDirection(movingCapabilities.direction, m)) {
              availableCoords.push(getAbsoluteCoords(currentCoords, offset));
            }
          }
        }

        return getCellsByCoords(availableCoords);
      }

      function getHorseCells(currentCoords) {
        var offsets = [
          [2, 1], [1, 2], [-2, 1], [-1, 2], [-2, -1], [-1, -2], [2, -1], [1, -2]
        ];

        var availableCoords = offsets.map(function (offset) {
          return getAbsoluteCoords(currentCoords, offset);
        });

        return getCellsByCoords(availableCoords);
      }

      function getCellsByCoords(coordsList) {
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
      }

      function getAbsoluteCoords(currentCoords, offset) {
        return [currentCoords[0] - offset[0], currentCoords[1] - offset[1]];
      }

    }
  });