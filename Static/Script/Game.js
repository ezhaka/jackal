(function () {

    if (!window.Jackal) {
        window.Jackal = {};
    }

    window.Jackal.Game = function() {
        var pThis = this,
            model = {};

        pThis.init = init;
        pThis.render = render;
        pThis.bindEvents = bindEvents;

        /*
        Accepts model: {
            players: [{
                id: 0,
                name: ''
            }, ...],
            cells: [{
                id: 0,
                type: 0,
                coords: []
            }, ...],
            pirates: [{
                id: 0,
                playerId: 0,
                cellId: 0,
                step: 0
            }, ...]
        }
         */
        function init(modelMeta)
        {
            model.players = modelMeta.players.map(function (playerMeta) {
                return new window.Jackal.Player(playerMeta);
            });

            model.field = new window.Jackal.Field({
                cells: modelMeta.cells,
                pirates: modelMeta.pirates,
                fieldSize: [2, 2],
                allocator: getAllocator(modelMeta.pirates)
            });

            model.pirates = modelMeta.pirates.map(function (pirateMeta) {
                return new window.Jackal.Pirate(pirateMeta);
            });
        }

        function render($container) {
            $container.html(model.field.render());

            model.pirates.forEach(function (pirate) {
                var pirateCell = model.field.getPirateCell(pirate.getId());
                var relativePosition = pirateCell.getPiratePosition(pirate.getId());

                if (!relativePosition)
                {
                    return;
                }

                var cellCoords = pirateCell.getOffset();

                var $pirateNode = pirate.render({
                    coords: [relativePosition.coords[0] + cellCoords[0], relativePosition.coords[1] + cellCoords[1]],
                    size: relativePosition.size
                });

                $container.append($pirateNode);
            })
        }

        function getAllocator(piratesMeta) {
            var pirateToCell = {};

            for (var i = 0, len = piratesMeta.length; i < len; i++) {
                var pirate = piratesMeta[i];

                pirateToCell[pirate.id] = {
                    cellId: pirate.cellId,
                    step: pirate.step
                };
            }

            return new window.Jackal.Allocator(pirateToCell);
        }

        function bindEvents() {
            model.field.bindEvents();
        }
    };

})();