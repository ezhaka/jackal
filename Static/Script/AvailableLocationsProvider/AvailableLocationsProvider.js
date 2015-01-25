define(
  [
    'movingCapabilites',
    'direction',
    'cells/cellContentType',
    'availableLocationsProvider/NeighborCellsProvider',
    'availableLocationsProvider/HorseCellsProvider',
    'availableLocationsProvider/WaterFilter',
    'MovingObjectType',
    'availableLocationsProvider/AvailablePirateLocationsProvider',
    'availableLocationsProvider/AvailableShipLocationsProvider'
  ],
  function (
    MovingCapabilites,
    Direction,
    CellContentType,
    NeighborCellsProvider,
    HorseCellsProvider,
    WaterFilter,
    MovingObjectType,
    AvailablePirateLocationsProvider,
    AvailableShipLocationsProvider) {
    // todo: use allocator instead of cells ?
    return function (field, shipsContainer, allocator) {
      var pThis = this;
      pThis.getAvailableLocations = getAvailableLocations;
      pThis.canMoveToLocation = canMoveToLocation;

      function canMoveToLocation(obj, objLocation, targetLocation) {
        return getAvailableLocations(obj, objLocation)
            .filter(function (l) {
              return targetLocation.equals(l);
            })
            .length > 0;
      }

      function getAvailableLocations(obj, objLocation) {
        if (obj.type == MovingObjectType.pirate) {
          var provider = new AvailablePirateLocationsProvider(field, shipsContainer, allocator);
          return provider.getLocations(obj, objLocation);
        }

        if (obj.type == MovingObjectType.ship) {
          var provider = new AvailableShipLocationsProvider(field, allocator);
          return provider.getLocations(objLocation);
        }

        throw new Error('unknown movable obj type: ' + obj.type);
      }
    }
  });