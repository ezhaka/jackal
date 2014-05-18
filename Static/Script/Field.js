(function () {

    if (!window.Jackal) {
        window.Jackal = {};
    }

    /*
     Accepts model:
    ...
     */

    window.Jackal.Field = function(modelMeta) {
        var pThis = this,
            cells;

        pThis.render = render;
        pThis.bindEvents = bindEvents;
        pThis.getPirateCell = getPirateCell;
        pThis.highlightAvailableCells = highlightAvailableCells;

        // todo: extract to view
        function render() {
            var result = $('<table class="field" />');

            for (var y = 0; y < modelMeta.fieldSize[0]; y++) {
                var row = $('<tr />');
                result.append(row);

                for (var x = 0; x < modelMeta.fieldSize[1]; x++) {
                    var cellMeta = cells.filter(function (cellItem) {
                        return cellItem.coords()[0] == x && cellItem.coords()[1] == y;
                    });

                    if (!cellMeta || cellMeta.length == 0)
                    {
                        continue;
                    }

                    var td = $('<td />');
                    td.html(cellMeta[0].render());
                    row.append(td);
                }
            }

            return result;
        }

        function bindEvents() {
        }

        function getCellsByCoords(coordsList) {
            return cells.filter(function (cell) {
                var cellCoords = cell.coords();
                var matchFound = false;

                coordsList.forEach(function (coords) {
                    if (coords[0] == cellCoords[0] && coords[1] == cellCoords[1]) {
                        matchFound = true;
                    }
                });

                return matchFound;
            })
        }

        function getAvailableCells(pirate) {
            var pirateId = pirate.getId();
            var pirateCell = getPirateCell(pirateId);
            var currentCoords = pirateCell.coords();

            var movingCapabilities = pirateCell.getMovingCapabilities(pirateId);

            var availableCells = [];

            if (movingCapabilities.type == window.Jackal.movingCapabilites.neighbor) {
                availableCells = getCellsByCoords([
                    [currentCoords[0], currentCoords[1] - 1],
                    [currentCoords[0], currentCoords[1] + 1],
                    [currentCoords[0] - 1, currentCoords[1]],
                    [currentCoords[0] - 1, currentCoords[1] - 1],
                    [currentCoords[0] - 1, currentCoords[1] + 1],
                    [currentCoords[0] + 1, currentCoords[1]],
                    [currentCoords[0] + 1, currentCoords[1] - 1],
                    [currentCoords[0] + 1, currentCoords[1] + 1]
                ])
            }

            // filter with another pirates...
            // filter with water

            return availableCells;
        }

        function highlightAvailableCells(pirate) {
            var availableCells = getAvailableCells(pirate);

            availableCells.forEach(function (c) { c.highlight(); });
        }

        function getPirateCell(pirateId) {
            var cellInfo = modelMeta.allocator.getPirateLocation(pirateId);
            return cells.filter(function (c) { return c.getId() == cellInfo.cellId; })[0];
        }

        function init() {
            cells = modelMeta.cells.map(function (c) {
                return new window.Jackal.Cell($.extend(c, { allocator: modelMeta.allocator }));
            });

        }

        init();
    };

})();