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
    return function (cells) {
      var pThis = this;
      pThis.getAvailableCells = getAvailableCells;

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