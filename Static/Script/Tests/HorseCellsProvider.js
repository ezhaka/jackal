define(['availableCellsProvider/horseCellsProvider', 'tests/stubCellsGenerator'],
  function (HorseCellsProvider, StubCellsGenerator) {
    var cellsProvider = new HorseCellsProvider(StubCellsGenerator.generate(5, 5));

    QUnit.test(
      'horseCellsProvider corner case',
      function (assert) {
        var neighborCells = cellsProvider.getHorseCells([4, 4]);
        var result = neighborCells
          .map(function (c) { return c.getId(); })
          .sort(function (a, b) { return a - b; });

        assert.deepEqual(result, [14, 18]);
      });

    QUnit.test(
      'horseCellsProvider center',
      function (assert) {
        var neighborCells = cellsProvider.getHorseCells([2, 2]);
        var result = neighborCells
          .map(function (c) { return c.getId();})
          .sort(function (a, b) { return a - b;});

        assert.deepEqual(result, [2, 4, 6, 10, 16, 20, 22, 24]);
      });
  });