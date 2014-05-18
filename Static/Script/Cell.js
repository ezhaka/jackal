(function () {

    if (!window.Jackal) {
        window.Jackal = {};
    }

    /*
    Accepts model:
    {
        id: 0,
        type: 0,
        allocator: window.Jackal.Allocator
    }
    */

    window.Jackal.Cell = function(modelMeta) {
        var pThis = this,
            view;

        pThis.render = render;
        pThis.coords = coords;
        pThis.getPiratePosition = getPiratePosition;
        pThis.getOffset = getOffset;
        pThis.getId = getId;
        pThis.getMovingCapabilities = getMovingCapabilities;
        pThis.highlight = highlight;

        function render() {
            return view.render();
        }

        function coords() {
            return modelMeta.coords;
        }

        function getId() {
            return modelMeta.id;
        }

        /*
        returns {
            coords: [px, px],
            size: [px, px]
        }
        or undefined if pirate is not on the field
         */
        function getPiratePosition(pirateId) {
            var piratePosition = modelMeta.allocator.getPirateLocation(pirateId);

            if (piratePosition.cellId != modelMeta.id) {
                throw new Error('Pirate is not on the cell, pirateId: ' + pirateId);
            }

            var neighbourPirateIds = modelMeta.allocator
                .getCellPirateIds(modelMeta.id, piratePosition.step)
                .filter(function (pid) { return pid != pirateId; });

            return view.getPiratePosition(
                pirateId,
                neighbourPirateIds);
        }

        function getOffset() {
            return view.getOffset();
        }

        function highlight() {
            view.highlight();
        }

        /*
        returns
        {
            type: 0,
            direction: 0,
            haveToMakeAnotherStep: 0
        }
         */
        function getMovingCapabilities(pirateId) {
            return {
                type: window.Jackal.movingCapabilites.neighbor
            }
        }

        function init() {
            view = new window.Jackal.CellView({ id: modelMeta.id });
        }

        init();
    };

})();