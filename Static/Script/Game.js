(function () {

	if (!window.Jackal) {
		window.Jackal = {};
	}

	window.Jackal.Game = function () {
		var pThis = this,
			model = {},
            stepManager;

		pThis.init = init;
		pThis.render = render;
		pThis.bindEvents = bindEvents;



		function render($container) {
			$container.html(model.field.render());

			model.pirates.forEach(function (pirate) {
				var $pirateNode = renderPirate(pirate);

				if ($pirateNode) {
					$container.append($pirateNode);
				}
			})
		}

		function renderPirate(pirate) {
			return pirate.render(getPirateCoordsAndSize(pirate));
		}

		function getPirateCoordsAndSize(pirate) {
			var pirateCell = model.field.getPirateCell(pirate.getId());
			var relativePosition = pirateCell.getPiratePosition(pirate.getId());

			if (!relativePosition) {
				return null;
			}

			var cellCoords = pirateCell.getOffset();

			return {
				coords: [relativePosition.coords[0] + cellCoords[0], relativePosition.coords[1] + cellCoords[1]],
				size: relativePosition.size
			};
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

			model.field.CellClick.addHandler(onCellClick);

			model.pirates.forEach(function (pirate) {
				pirate.bindEvents();
				pirate.Click.addHandler(onPirateClick);
			})
		}

		function onPirateClick(sender, args) {
			sender.select();
			model.field.highlightAvailableCells(sender);
		}

		function getSelectedPirate() {
			var selectedPirate = model.pirates.filter(function (p) {
				return p.getIsSelected();
			});

			return selectedPirate.length > 0 ? selectedPirate[0] : null;
		}

		function onCellClick(field, args) {
			var cell = args.cell;
			var selectedPirate = getSelectedPirate();

			if (!selectedPirate) {
				return;
			}

			if (model.field.canMoveTo(selectedPirate, cell)) {
                stepManager.move(selectedPirate.getId(), cell.getId());
			}
            else {
                selectedPirate.deselect();
            }

			model.field.removeCellsHighlight();
		}

        function onMoveComplete(sender, args) {
            var cell = model.field.getCellById(args.cellId);
            var pirate = getPirateById(args.pirateId);
            pirate.moveTo(getPirateCoordsAndSize(pirate));

            if (cell.isClosed()) {
                cell.setContent(args.cellContent);
            }

            model.field.moveTo(pirate, cell);
            pirate.moveTo(getPirateCoordsAndSize(pirate));

            if (pirate.getIsSelected()) {
                pirate.deselect();
            }
        }

        function getPirateById(id) {
            return model.pirates.filter(function (p) {
                return p.getId() == id;
            })[0];
        }


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
        function init(modelMeta) {
            model.players = modelMeta.players.map(function (playerMeta) {
                return new window.Jackal.Player(playerMeta);
            });

            model.field = new window.Jackal.Field({
                cells: modelMeta.cells,
                pirates: modelMeta.pirates,
                fieldSize: modelMeta.fieldSize,
                allocator: getAllocator(modelMeta.pirates)
            });

            model.pirates = modelMeta.pirates.map(function (pirateMeta) {
                return new window.Jackal.Pirate(pirateMeta);
            });

            stepManager = new Jackal.StepManager();
            stepManager.MoveComplete.addHandler(onMoveComplete);
        }
	};

})();