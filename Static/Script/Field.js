define(
  [
    'event',
    'movingCapabilites',
    'direction',
    'cell',
    'cells/cellContentType',
    'fieldView',
    'availableCellsProvider/availableCellsProvider',
    'MovingObjectType',
    'locationType'
  ],
  function (Event, MovingCapabilites, Direction, Cell, CellContentType, FieldView, AvailableCellsProvider, MovingObjectType, LocationType) {

    /*
     Accepts model:
     ...
     */

    return function (modelMeta) {
      var pThis = this,
        cells,
        view,
        availableCellsProvider;

      pThis.render = render;
      pThis.bindEvents = bindEvents;
      pThis.getPirateCell = getPirateCell;
      pThis.highlightAvailableCells = highlightAvailableCells;
      pThis.removeCellsHighlight = removeCellsHighlight;
      pThis.moveTo = moveTo;
      pThis.getCellById = getCellById;
      pThis.getAvailableCells = getAvailableCells;
      pThis.getCells = getCells;

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

      function getAvailableCells(pirate) {
        var pirateId = pirate.getId();
        var pirateCell = getPirateCell(pirateId);
        return availableCellsProvider.getAvailableCells(pirateId, pirateCell);
      }

      function highlightAvailableCells(pirate) {
        var availableCells = getAvailableCells(pirate);

        availableCells.forEach(function (c) {
          c.toggleHighlight(true);
        });
      }

      function moveTo(pirate, cell) {
        // todo: check can move?
        modelMeta.allocator.setObjectLocation(
          { type: MovingObjectType.pirate, id: pirate.getId() },
          { type: LocationType.cell, cellId: cell.getId() });
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
        var cellInfo = modelMeta.allocator.getObjectLocation({ type: MovingObjectType.pirate, id: pirateId });
        var cellId = cellInfo.cellId;
        return getCellById(cellId);
      }

      function getCells() {
        return cells;
      }

      function init() {
        cells = modelMeta.cells.map(function (c) {
          return new Cell($.extend(c, {allocator: modelMeta.allocator}));
        });

        view = new FieldView({
          fieldSize: modelMeta.fieldSize,
          cells: cells
        });

        availableCellsProvider = new AvailableCellsProvider(cells);
      }

      init();
    };

  });