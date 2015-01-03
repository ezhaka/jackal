define(['LocationType'], function (LocationType) {
  return function (field, shipsContainer) {
    this.getByInfo = function (locationInfo) {
      if (locationInfo.type == LocationType.cell) {
        return field.getCellById(locationInfo.id);
      }

      if (locationInfo.type == LocationType.ship) {
        return shipsContainer.getById(locationInfo.id);
      }

      throw new Error('unknown location type: ' + locationInfo.type);
    }
  }
});