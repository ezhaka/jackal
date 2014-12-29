define(
  ['event', 'movingCapabilites', 'direction', 'cell', 'cells/cellContentType'],
  function (Event, MovingCapabilites, Direction, Cell, CellContentType) {

    /*
     Accepts model:
     ...
     */

    return function (modelMeta) {
      var pThis = this,
        cells;

      pThis.render = render;
      pThis.bindEvents = bindEvents;
      pThis.getPirateCell = getPirateCell;
      pThis.highlightAvailableCells = highlightAvailableCells;
      pThis.removeCellsHighlight = removeCellsHighlight;
      pThis.canMoveTo = canMoveTo;
      pThis.moveTo = moveTo;
      pThis.getCellById = getCellById;
      pThis.getAvailableCells = getAvailableCells;

      pThis.CellClick = new Event(pThis);

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

            if (!cellMeta || cellMeta.length == 0) {
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
        cells.forEach(function (cell) {
          cell.bindEvents();
          cell.Click.addHandler(onCellClick);
        });
      }

      function onCellClick(cell, args) {
        var newArgs = $.extend(args || {}, {cell: cell});
        pThis.CellClick.fireHandlers(newArgs);
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

      function getAbsoluteCoords(currentCoords, offset) {
        return [currentCoords[0] - offset[0], currentCoords[1] - offset[1]];
      }

      function getAvailableCells(pirate) {
        var pirateId = pirate.getId();
        var pirateCell = getPirateCell(pirateId);
        var currentCoords = pirateCell.coords();

        var movingCapabilities = pirateCell.getMovingCapabilities(pirateId);

        var availableCells = [];

        if (movingCapabilities.type == MovingCapabilites.neighbor
          || movingCapabilities.type == MovingCapabilites.water) {

          var availableCoords = [];

          var directionMapping = {};
          directionMapping[Direction.top] = [0, 1];
          directionMapping[Direction.topRight] = [1, 1];
          directionMapping[Direction.right] = [1, 0];
          directionMapping[Direction.bottomRight] = [1, -1];
          directionMapping[Direction.bottom] = [0, -1];
          directionMapping[Direction.bottomLeft] = [-1, -1];
          directionMapping[Direction.left] = [-1, 0];
          directionMapping[Direction.topLeft] = [-1, 1];

          for (var m in directionMapping) {
            if (directionMapping.hasOwnProperty(m)) {
              var offset = directionMapping[m];

              if (!movingCapabilities.direction || Direction.hasDirection(movingCapabilities.direction, m)) {
                availableCoords.push(getAbsoluteCoords(currentCoords, offset));
              }
            }
          }

          availableCells = getCellsByCoords(availableCoords);
        }

        if (movingCapabilities.type == MovingCapabilites.horse) {
          var offsets = [
            [2, 1], [1, 2], [-2, 1], [-1, 2], [-2, -1], [-1, -2], [2, -1], [1, -2]
          ];

          var availableCoords = offsets.map(function (offset) {
            return getAbsoluteCoords(currentCoords, offset);
          });

          availableCells = getCellsByCoords(availableCoords);
        }


        // filter with another pirates...

        // filter with water
        if (pirateCell.getContent().getContentType() == CellContentType.water) {
          availableCells = availableCells.filter(function (c) {
            return c.getContent() ? c.getContent().getContentType() == CellContentType.water : false;
          });
        } else {
          availableCells = availableCells.filter(function (c) {
            return c.getContent() ? c.getContent().getContentType() != CellContentType.water : true;
          });
        }

        return availableCells;
      }

      function highlightAvailableCells(pirate) {
        var availableCells = getAvailableCells(pirate);

        availableCells.forEach(function (c) {
          c.toggleHighlight(true);
        });
      }

      function canMoveTo(pirate, cell) {
        var availableCells = getAvailableCells(pirate);
        return availableCells.filter(function (ac) {
            return ac.getId() == cell.getId();
          }).length > 0;
      }

      function moveTo(pirate, cell) {
        // todo: check can move?
        modelMeta.allocator.setPirateLocation(pirate.getId(), {
          cellId: cell.getId()
        });
      }

      function removeCellsHighlight() {
        cells.forEach(function (c) {
          c.toggleHighlight(false);
        });
      }

      function getCellById(cellId) {
        return cells.filter(function (c) {
          return c.getId() == cellId;
        })[0];
      }

      function getPirateCell(pirateId) {
        var cellInfo = modelMeta.allocator.getPirateLocation(pirateId);
        var cellId = cellInfo.cellId;
        return getCellById(cellId);
      }

      function init() {
        cells = modelMeta.cells.map(function (c) {
          return new Cell($.extend(c, {allocator: modelMeta.allocator}));
        });
      }

      init();
    };

  });