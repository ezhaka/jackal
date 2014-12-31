define(function () {

  /*
   accepts
   pirateToLocation = {
   pirateId : { shipId: 0 } or { cellId: 0, step: 0 }
   }
   */

  return function (pirateToLocation, shipToCell) {
    var pThis = this;

    pThis.getPirateLocation = getPirateLocation;
    pThis.setPirateLocation = setPirateLocation;
    pThis.getCellPirateIds = getCellPirateIds;
    pThis.getShipPirateIds = getShipPirateIds;
    pThis.getShipCellId = getShipCellId;

    /* returns { cellId: 0, step: 0 } */
    function getPirateLocation(pirateId) {
      return pirateToLocation[pirateId];
    }

    /* returns [0, 0, ...] */
    function getCellPirateIds(cellId, step) {
      return filterPirateIds(function (location) {
        return location.cellId == cellId && (!step || location.step == step);
      });
    }

    function getShipPirateIds(shipId) {
      return filterPirateIds(function (location) { return location.shipId == shipId; });
    }

    function filterPirateIds(func) {
      var result = [];

      for (var pirateId in pirateToLocation) {
        if (pirateToLocation.hasOwnProperty(pirateId)
          && pirateToLocation[pirateId]
          && func(pirateToLocation[pirateId])) {
          result.push(pirateId);
        }
      }

      return result;
    }

    function setPirateLocation(pirateId, locationInfo) {
      pirateToLocation[pirateId] = locationInfo;
    }

    function getShipCellId(shipId) {
      return shipToCell[shipId];
    }
  };

});