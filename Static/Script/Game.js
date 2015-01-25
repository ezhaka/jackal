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
        availableLocationsProvider;

      pThis.init = init;
      pThis.render = render;
      pThis.bindEvents = bindEvents;

      function render($container) {
        $container.html(model.field.render());

        model.pirates.forEach(function (pirate) {
          var location = allocator.getObjectLocation(pirate);
          var $pirateNode = pirate.render(location);
          $container.append($pirateNode);
        });

        shipContainer.getShips().forEach(function (ship) {
          var location = allocator.getObjectLocation(ship);
          $container.append(ship.render(location));
        });
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

        return selectedPirate.length > 0 ? selectedPirate[0] : shipContainer.getSelectedShip();
      }

      function onPirateClick(pirate, args) {
        onMovableObjClick(pirate);
      }

      function onCellClick(field, args) {
        var cell = args.cell;
        var selectedObject = getSelectedObject();

        if (!selectedObject) {
          return;
        }

        var selectedObjLocation = allocator.getObjectLocation(selectedObject);
        if (availableLocationsProvider.canMoveToLocation(selectedObject, selectedObjLocation, cell)) {
          allocator.move(selectedObject, cell);
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
          if (availableLocationsProvider.canMoveToLocation(selectedPirate, allocator.getObjectLocation(selectedPirate), ship)) {
            allocator.move(selectedPirate, ship);
          }
          else {
            selectedPirate.deselect();
          }

          model.field.removeCellsHighlight();
          shipContainer.removeHighlights();
        }
        else {
          onMovableObjClick(ship);
        }
      }

      function onMovableObjClick(obj) {
        obj.select();
        var objLocation = allocator.getObjectLocation(obj);
        var availableLocations = availableLocationsProvider.getAvailableLocations(obj, objLocation);
        availableLocations.forEach(function (l) { l.toggleHighlight(true); });
      }

      function onMoveComplete(sender, args) {
        var location = args.location;
        var movingObject = args.obj;
        movingObject.moveTo(location);

        var movingCapabilities = location.getMovingCapabilities();
        var availableCells = availableLocationsProvider.getAvailableLocations(movingObject, location);
        if (movingCapabilities.haveToMakeAnotherStep && availableCells.length == 1) {
          allocator.move(args.obj, availableCells[0]);
        }

        if (movingObject.getIsSelected()) {
          movingObject.deselect();
        }
      }

      function initAllocator(piratesMeta, shipsMeta) {
        allocator = new Allocator(model.pirates, model.field, shipContainer);

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

      function init(modelMeta) {
        model.players = modelMeta.players.map(function (playerMeta) {
          return new Player(playerMeta);
        });

        model.field = new Field({
          cells: modelMeta.cells,
          pirates: modelMeta.pirates,
          fieldSize: modelMeta.fieldSize
        });

        model.pirates = modelMeta.pirates.map(function (pirateMeta) {
          return new Pirate(pirateMeta);
        });

        shipContainer = new ShipsContainer(modelMeta.ships);
        shipContainer.getShips().forEach(function (s) { s.Click.addHandler(onShipClick); });

        initAllocator(modelMeta.pirates, modelMeta.ships);
        availableLocationsProvider = new AvailableLocationsProvider(model.field, shipContainer, allocator);
      }
    };
  });