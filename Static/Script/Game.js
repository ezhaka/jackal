define(['allocator', 'player', 'field', 'pirate', 'stepManager', 'shipsContainer', 'AvailableCellsProvider/AvailableCellsProvider'],
  function (Allocator, Player, Field, Pirate, StepManager, ShipsContainer, AvailableCellsProvider) {
    return function () {
      var pThis = this,
        model = {},
        stepManager,
        allocator,
        shipContainer,
        availableCellsProvider;

      pThis.init = init;
      pThis.render = render;
      pThis.bindEvents = bindEvents;

      function render($container) {
        $container.html(model.field.render());

        model.pirates.forEach(function (pirate) {
          var $pirateNode = pirate.render(getPirateCoordsAndSize(pirate));
          $container.append($pirateNode);
        });

        shipContainer.getShips().forEach(function (ship) {
          $container.append(ship.render(getShipCoords(ship)));
        });
      }

      function getPirateCoordsAndSize(pirate) {
        var pirateId = pirate.getId();
        var locationInfo = allocator.getPirateLocation(pirateId);
        var location = locationInfo.cellId
          ? model.field.getCellById(locationInfo.cellId)
          : shipContainer.getById(locationInfo.shipId);

        var relativePosition = location.getPiratePosition(pirateId);
        var locationCoords = location.getOffset();

        return {
          coords: [relativePosition.coords[0] + locationCoords[0], relativePosition.coords[1] + locationCoords[1]],
          size: relativePosition.size
        };
      }

      function getShipCoords(ship) {
        var cellId = allocator.getShipCellId(ship.getId());
        return model.field.getCellById(cellId).getOffset();
      }

      function bindEvents() {
        model.field.bindEvents();
        model.field.CellClick.addHandler(onCellClick);

        model.pirates.forEach(function (pirate) {
          pirate.bindEvents();
          pirate.Click.addHandler(onPirateClick);
        })
      }

      function getSelectedPirate() {
        var selectedPirate = model.pirates.filter(function (p) {
          return p.getIsSelected();
        });

        return selectedPirate.length > 0 ? selectedPirate[0] : null;
      }

      function onPirateClick(sender, args) {
        sender.select();
        model.field.highlightAvailableCells(sender);
        shipContainer.highlightShips(
          availableCellsProvider.getAvailableShips(sender, model.field.getPirateCell(sender.getId())));
      }

      function onCellClick(field, args) {
        var cell = args.cell;
        var selectedPirate = getSelectedPirate();

        if (!selectedPirate) {
          return;
        }

        if (availableCellsProvider.canMoveToCell(selectedPirate, model.field.getPirateCell(selectedPirate.getId()), cell.getId())) {
          stepManager.move(selectedPirate.getId(), cell.getId());
        }
        else {
          selectedPirate.deselect();
        }

        model.field.removeCellsHighlight();
        shipContainer.removeHighlights();
      }


      function onShipClick(ship) {
        var selectedPirate = getSelectedPirate();

        if (selectedPirate) {
          if (availableCellsProvider.canMoveToShip(selectedPirate, model.field.getPirateCell(selectedPirate.getId()), ship.getId())) {
            stepManager.moveToShip(ship.getId());
          }
          else {
            selectedPirate.deselect();
          }

          model.field.removeCellsHighlight();
          shipContainer.removeHighlights();
        }
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

        var movingCapabilities = cell.getMovingCapabilities();
        var availableCells = model.field.getAvailableCells(pirate);
        if (movingCapabilities.haveToMakeAnotherStep && availableCells.length == 1) {
          stepManager.move(args.pirateId, availableCells[0].getId());
        }

        if (pirate.getIsSelected()) {
          pirate.deselect();
        }
      }

      function getPirateById(id) {
        return model.pirates.filter(function (p) {
          return p.getId() == id;
        })[0];
      }

      function initAllocator(piratesMeta, shipsMeta) {
        var pirateToLocation = {};

        piratesMeta.forEach(function (pirate) {
          pirateToLocation[pirate.id] = {
            cellId: pirate.cellId,
            step: pirate.step
          };
        });

        var shipToCell = {};

        shipsMeta.forEach(function (ship) {
          shipToCell[ship.id] = ship.cellId;
        });

        allocator = new Allocator(pirateToLocation, shipToCell);
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
        initAllocator(modelMeta.pirates, modelMeta.ships);

        model.players = modelMeta.players.map(function (playerMeta) {
          return new Player(playerMeta);
        });

        model.field = new Field({
          cells: modelMeta.cells,
          pirates: modelMeta.pirates,
          fieldSize: modelMeta.fieldSize,
          allocator: allocator
        });

        model.pirates = modelMeta.pirates.map(function (pirateMeta) {
          return new Pirate(pirateMeta);
        });

        stepManager = new StepManager();
        stepManager.MoveComplete.addHandler(onMoveComplete);

        shipContainer = new ShipsContainer(modelMeta.ships);
        shipContainer.getShips().Click.addHandler(onShipClick);

        availableCellsProvider = new AvailableCellsProvider(model.field.getCells());
      }
    };
  });