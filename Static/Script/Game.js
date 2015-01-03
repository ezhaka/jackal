define(
  [
    'allocator',
    'player',
    'field',
    'pirate',
    'shipsContainer',
    'AvailableLocationsProvider/AvailableLocationsProvider',
    'movingObjectType',
    'locationType',
    'locationProvider',
    'movingObjectProvider'
  ],
  function (Allocator, Player, Field, Pirate, ShipsContainer, AvailableLocationsProvider, MovingObjectType, LocationType, LocationProvider, MovingObjectProvider) {
    return function () {
      var pThis = this,
        model = {},
        allocator,
        shipContainer,
        availableLocationsProvider,
        locationProvider,
        movingObjectProvider;

      pThis.init = init;
      pThis.render = render;
      pThis.bindEvents = bindEvents;

      function render($container) {
        $container.html(model.field.render());

        model.pirates.forEach(function (pirate) {
          var location = locationProvider.getByInfo(allocator.getObjectLocationInfo(pirate.getInfo()));
          var $pirateNode = pirate.render(location);
          $container.append($pirateNode);
        });

        shipContainer.getShips().forEach(function (ship) {
          $container.append(ship.render(getShipCoords(ship)));
        });
      }

      function getShipCoords(ship) {
        var shipLocation = allocator.getObjectLocationInfo({ type: MovingObjectType.ship, id: ship.getId() });

        if (shipLocation.type !== LocationType.cell) {
          throw new Error('ship is not on a cell');
        }

        return model.field.getCellById(shipLocation.cellId).getOffset();
      }

      function bindEvents() {
        model.field.bindEvents();
        model.field.CellClick.addHandler(onCellClick);

        model.pirates.forEach(function (pirate) {
          pirate.bindEvents();
          pirate.Click.addHandler(onPirateClick);
        })
      }

      function getSelectedObject() {
        var selectedPirate = model.pirates.filter(function (p) {
          return p.getIsSelected();
        });

        return selectedPirate.length > 0 ? selectedPirate[0] : null;
      }

      function onPirateClick(sender, args) {
        sender.select();
        model.field.highlightCells(sender);
        shipContainer.highlightShips(
          availableLocationsProvider.getAvailableShips(sender, model.field.getPirateCell(sender.getId())));
      }

      function onCellClick(field, args) {
        var cell = args.cell;
        var selectedObject = getSelectedObject();

        if (!selectedObject) {
          return;
        }

        if (availableLocationsProvider.canMoveToLocation(selectedObject, model.field.getPirateCell(selectedObject.getId()), cell.getId())) {
          allocator.move(selectedObject.getInfo(), cell.getInfo());
        }
        else {
          selectedObject.deselect();
        }

        model.field.removeCellsHighlight();
        shipContainer.removeHighlights();
      }


      function onShipClick(ship) {
        var selectedPirate = getSelectedObject();

        if (selectedPirate) {
          if (availableLocationsProvider.canMoveToShip(selectedPirate, model.field.getPirateCell(selectedPirate.getId()), ship.getId())) {
            allocator.move(selectedPirate.getInfo(), ship.getInfo());
          }
          else {
            selectedPirate.deselect();
          }

          model.field.removeCellsHighlight();
          shipContainer.removeHighlights();
        }
      }

      function onMoveComplete(sender, args) {
        var location = locationProvider.getByInfo(args.locationInfo);
        var movingObject = movingObjectProvider.getByObjInfo(args.objInfo);
        movingObject.moveTo(location);

        if (location.isClosed()) {
          location.setContent(args.cellContent);
        }

        var movingCapabilities = location.getMovingCapabilities();
        var availableCells = availableLocationsProvider.getAvailableLocations(movingObject);
        if (movingCapabilities.haveToMakeAnotherStep && availableCells.length == 1) {
          allocator.move(args.objInfo, availableCells[0].getInfo());
        }

        if (movingObject.getIsSelected()) {
          movingObject.deselect();
        }
      }

      function initAllocator(piratesMeta, shipsMeta) {
        allocator = new Allocator();

        piratesMeta.forEach(function (pirate) {
          allocator.initObjectLocation(
            {
              type: MovingObjectType.pirate,
              id: pirate.id
            },
            pirate.location);
        });

        shipsMeta.forEach(function (ship) {
          allocator.initObjectLocation(
            {
              type: MovingObjectType.ship,
              id: ship.id
            },
            ship.location);
        });

        allocator.MoveComplete.addHandler(onMoveComplete);
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
        initAllocator();

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

        shipContainer = new ShipsContainer(modelMeta.ships);
        shipContainer.getShips().Click.addHandler(onShipClick);

        availableLocationsProvider = new AvailableLocationsProvider(model.field.getCells());
        locationProvider = new LocationProvider(model.field, shipContainer);
        movingObjectProvider = new MovingObjectProvider(model.pirates, shipContainer);
      }
    };
  });