define(function () {

  /*
   accepts
   pirateToCell = {
   pirateId : { cellId: 0, step: 0 }
   }
   */

  return function (pirateToCell) {
    var pThis = this;

    pThis.getPirateLocation = getPirateLocation;
    pThis.setPirateLocation = setPirateLocation;
    pThis.getCellPirateIds = getCellPirateIds;

    /* returns { cellId: 0, step: 0 } */
    function getPirateLocation(pirateId) {
      return pirateToCell[pirateId];
    }

    /* returns [0, 0, ...] */
    function getCellPirateIds(cellId, step) {
      var result = [];

      for (var pirateId in pirateToCell) {
        if (pirateToCell.hasOwnProperty(pirateId)
          && pirateToCell[pirateId]
          && pirateToCell[pirateId].cellId == cellId
          && (!step || pirateToCell[pirateId].step == step)) {
          result.push(pirateId);
        }
      }

      return result;
    }

    function setPirateLocation(pirateId, cellInfo) {
      pirateToCell[pirateId] = cellInfo;
    }
  };

});