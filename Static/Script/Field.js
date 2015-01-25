define(
  [
    'event',
    'movingCapabilites',
    'direction',
    'cell',
    'cells/cellContentType',
    'fieldView',
    'MovingObjectType'
  ],
  function (Event, MovingCapabilites, Direction, Cell, CellContentType, FieldView, MovingObjectType) {

    /*
     Accepts model:
     ...
     */

    return function (modelMeta) {
      var pThis = this,
        cells,
        view;

      pThis.render = render;
      pThis.bindEvents = bindEvents;
      pThis.highlightCells = highlightCells;
      pThis.removeCellsHighlight = removeCellsHighlight;
      pThis.getCellById = getCellById;
      pThis.getCells = getCells;
      pThis.getCellsByCoords = getCellsByCoords;

      pThis.CellClick = new Event(pThis);

      function render() {
        return view.render();
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

      function highlightCells(cells) {
        cells.forEach(function (c) {
          c.toggleHighlight(true);
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

      function getCells() {
        return cells;
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

      function init() {
        cells = modelMeta.cells.map(function (c) {
          return new Cell(c);
        });

        view = new FieldView({
          fieldSize: modelMeta.fieldSize,
          cells: cells
        });
      }

      init();
    };

  });