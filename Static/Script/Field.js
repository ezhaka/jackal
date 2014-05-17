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