define(
  [
    'movingCapabilites',
    'availableLocationsProvider/NeighborCellsProvider',
    'availableLocationsProvider/HorseCellsProvider',
    'availableLocationsProvider/WaterFilter',
    'LocationType',
    'MovingObjectType'
  ],
  function (MovingCapabilites, NeighborCellsProvider, HorseCellsProvider, WaterFilter, LocationType, MovingObjectType) {
    return function (field, shipsContainer, allocator) {
      var pThis = this;
      pThis.getLocations = getLocations;

      function getLocations(obj, objLocation) {
        var availableCells = getAvailableByCurrentMovingCapabilities(obj.getId(), objLocation);
        var objectsOnAvailableCells = allocator.getObjectsByLocations(availableCells);
        var availableShips = objectsOnAvailableCells.filter(function (o) { return o.type == MovingObjectType.ship; });

        // todo: filter by other pirates...
        availableCells = WaterFilter.filterByWater(objLocation, availableCells);
        return availableCells.concat(availableShips);
      }

      function getCoords(location) {
        // todo: it's better to have method coords() in ship, but ship doesn't know about allocator and its cell
        if (location.type == LocationType.ship) {
          return allocator.getObjectLocation(location).coords();
        }

        return location.coords();
      }

      function getAvailableByCurrentMovingCapabilities(pirateId, location) {
        var currentCoords = getCoords(location);
        var movingCapabilities = location.getMovingCapabilities(pirateId);

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