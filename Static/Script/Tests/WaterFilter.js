define(['../AvailableLocationsProvider/waterFilter', 'cells/cellContentType', 'cell'],
  function (WaterFilter, CellContentType, Cell) {
    var cells = [
      new Cell({id: 1, coords: [0, 0], content: { type: CellContentType.empty }}),
      new Cell({id: 2, coords: [0, 1], content: { type: CellContentType.water }}),
      new Cell({id: 3, coords: [1, 0], content: { type: CellContentType.empty }}),
      new Cell({id: 4, coords: [1, 1], content: { type: CellContentType.water }})
    ];

    QUnit.test(
      'waterFilter: cannot step from ground to water',
      function (assert) {
        var result = WaterFilter.filterByWater(cells[0], cells.slice(1));
        assert.deepEqual(result.map(function (c) { return c.getId(); }), [3]);
      });

    QUnit.test(
      'waterFilter: cannot step from water to ground',
      function (assert) {
        var result = WaterFilter.filterByWater(cells[1], [ cells[0], cells[2], cells[3] ]);
        assert.deepEqual(result.map(function (c) { return c.getId(); }), [4]);
      });
  });