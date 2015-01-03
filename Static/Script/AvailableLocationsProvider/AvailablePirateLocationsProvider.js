define(
  [
    'movingCapabilites',
    'direction',
    'cells/cellContentType',
    'availableLocationsProvider/NeighborCellsProvider',
    'availableLocationsProvider/HorseCellsProvider',
    'availableLocationsProvider/WaterFilter',
    'MovingObjectType',
    'availableLocationsProvider/AvailablePirateLocationsProvider'
  ],
  function (MovingCapabilites, Direction, CellContentType, NeighborCellsProvider, HorseCellsProvider, WaterFilter, MovingObjectType, AvailablePirateLocationsProvider) {
    return function (field, shipsContainer) {
      var pThis = this;
      pThis.getLocations = getLocations;

      function getLocations(obj, objLocation) {
        var availableCells = getAvailableByCurrentCellType(obj, objLocation);
        var availableShips = shipsContainer.getShipsByCellIds(availableCells.map(function (c) {return c.getId();}));
        // todo: filter by other pirates...
        availableCells = WaterFilter.filterByWater(objLocation, availableCells);
        return availableCells.concat(availableShips);
      }

      function getAvailableByCurrentCellType(pirateId, pirateCell) {
        var currentCoords = pirateCell.coords();
        var movingCapabilities = pirateCell.getMovingCapabilities(pirateId);

        if (movingCapabilities.type == MovingCapabilites.neighbor
          || movingCapabilities.type == MovingCapabilites.water) {
          var neighborCellsProvider = new NeighborCellsProvider(field);
          return neighborCellsProvider.getNeighborCells(movingCapabilities, currentCoords);
        }

        if (movingCapabilities.type == MovingCapabilites.horse) {
          var horseCellsProvider = new HorseCellsProvider(field);
          return horseCellsProvider.getHorseCells(currentCoords);
        }

        throw new Error('Unknown moving capabilities type: ' + movingCapabilities.type);
      }
    }
  });