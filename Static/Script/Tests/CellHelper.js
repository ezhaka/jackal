define(['availableCellsProvider/cellHelper', 'cell'],
  function (CellHelper, Cell) {
    QUnit.test(
      'getCellsByCoords([ [0, 0], [1, 1] ]) on field 2x2 returns [1, 4]',
      function (assert) {
        var cells = [
          new Cell({id: 1, coords: [0, 0]}),
          new Cell({id: 2, coords: [0, 1]}),
          new Cell({id: 3, coords: [1, 0]}),
          new Cell({id: 4, coords: [1, 1]})
        ];

        var result = CellHelper.getCellsByCoords([[0, 0], [1, 1]], cells).map(function (c) {
          return c.getId();
        });

        assert.deepEqual(result, [1, 4]);
      });

    QUnit.test(
      'getAbsoluteCoords([0, 1], [-1, 0]) returns [0, 0] (negative offset)',
      function (assert) {
        var result = CellHelper.getAbsoluteCoords([0, 1], [0, -1]);
        assert.deepEqual(result, [0, 0]);
      });

    QUnit.test(
      'getAbsoluteCoords([1, 0], [2, 1]) returns [3, 1] (positive offset)',
      function (assert) {
        var result = CellHelper.getAbsoluteCoords([1, 0], [2, 1]);
        assert.deepEqual(result, [3, 1]);
      });
  });