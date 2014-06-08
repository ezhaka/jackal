(function () {

    if (!window.Jackal) {
        window.Jackal = {};
    }

    /*
    accepts
    pirateToCell = {
        pirateId : { cellId: 0, step: 0 }
    }
    */

    window.Jackal.Allocator = function(pirateToCell) {
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

            /* todo: refactor, bad practice */
            for (var pirateId in pirateToCell) {
                if (pirateToCell[pirateId]
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

})();