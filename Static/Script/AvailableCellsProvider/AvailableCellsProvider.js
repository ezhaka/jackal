define(
  [
    'movingCapabilites',
    'direction',
    'cells/cellContentType',
    'availableCellsProvider/NeighborCellsProvider',
    'availableCellsProvider/HorseCellsProvider',
    'availableCellsProvider/WaterFilter'
  ],
  function (MovingCapabilites, Direction, CellContentType, NeighborCellsProvider, HorseCellsProvider, WaterFilter) {
    // todo: use allocator instead of cells ?
    return function (cells, shipsContainer) {
      var pThis = this;
      pThis.getAvailableCells = getAvailableCells;
      pThis.getAvailableShips = getAvailableShips;
      pThis.canMoveToCell = canMoveToCell;
      pThis.canMoveToShip = canMoveToShip;

      function getAvailableShips(pirateId, pirateCell) {
        var availableCells = getAvailableByCurrentCellType(pirateId, pirateCell);
        return shipsContainer.getShipsByCellIds(availableCells.map(function (c) { return c.getId(); }));
      }

      function canMoveToShip(pirateId, pirateCell, shipId) {
        return pThis.getAvailableShips(pirateId, pirateCell)
            .filter(function (s) {
              return s.getId() == shipId
            })
            .length > 0;
      }

      function canMoveToCell(pirateId, pirateCell, cellId) {
        return pThis.getAvailableCells(pirateId, pirateCell)
            .filter(function (с) {
              return c.getId() == cellId
            })
            .length > 0;
      }

      function getAvailableCells(pirateId, pirateCell) {
        var availableCells = getAvailableByCurrentCellType(pirateId, pirateCell);
        // todo: filter by other pirates...
        availableCells = WaterFilter.filterByWater(pirateCell, availableCells);
        return availableCells;
      }

      function getAvailableByCurrentCellType(pirateId, pirateCell) {
        var currentCoords = pirateCell.coords();
        var movingCapabilities = pirateCell.getMovingCapabilities(pirateId);

        if (movingCapabilities.type == MovingCapabilites.neighbor
          || movingCapabilities.type == MovingCapabilites.water) {
          var neighborCellsProvider = new NeighborCellsProvider(cells);
          return neighborCellsProvider.getNeighborCells(movingCapabilities, currentCoords);
        }

        if (movingCapabilities.type == MovingCapabilites.horse) {
          var horseCellsProvider = new HorseCellsProvider(cells);
          return horseCellsProvider.getHorseCells(currentCoords);
        }

        throw new Error('Unknown moving capabilities type: ' + movingCapabilities.type);
      }
    }
  });