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
    // todo: use allocator instead of cells ?
    return function (field, shipsContainer) {
      var pThis = this;
      pThis.getAvailableLocations = getAvailableLocations;
      pThis.canMoveToLocation = canMoveToLocation;

      function canMoveToLocation(obj, objLocation, targetLocation) {
        return pThis.getAvailableLocations(obj, objLocation)
            .filter(function (l) {
              return targetLocation.equals(l);
            })
            .length > 0;
      }

      function getAvailableLocations(obj, objLocation) {
        if (obj.type == MovingObjectType.pirate) {
          var provider = new AvailablePirateLocationsProvider(field, shipsContainer);
          return provider.getLocations(obj, objLocation);
        }

        if (obj.type == MovingObjectType.ship) {

        }

        throw new Error('unknown movable obj type: ' + obj.type);
      }
    }
  });