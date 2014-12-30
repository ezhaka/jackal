define(['direction', 'cell', 'availableCellsProvider/neighborCellsProvider'],
  function (Direction, Cell, NeighborCellsProvider) {
    var cells3x3 = [];
    var indx = 0;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        cells3x3[indx] = new Cell({id: indx + 1, coords: [i, j]});
        indx++;
      }
    }

    var cellsProvider = new NeighborCellsProvider(cells3x3);

    QUnit.test(
      'neighborCellsProvider corner case, any direction',
      function (assert) {
        var neighborCells = cellsProvider.getNeighborCells({}, [2, 2]);
        assert.deepEqual(neighborCells.map(function (c) { return c.getId(); }), [ 5, 6, 8 ]);
      });

    QUnit.test(
      'neighborCellsProvider corner case, right direction -> empty result',
      function (assert) {
        var neighborCells = cellsProvider.getNeighborCells({ direction: Direction.right }, [2, 2]);
        assert.deepEqual(neighborCells, []);
      });

    QUnit.test(
      'neighborCellsProvider center, any direction',
      function (assert) {
        var neighborCells = cellsProvider.getNeighborCells({}, [1, 1]);
        assert.deepEqual(neighborCells.map(function (c) { return c.getId(); }), [1, 2, 3, 4, 6, 7, 8, 9]);
      });

    QUnit.test(
      'neighborCellsProvider center, directions: top-left, top-right, bottom',
      function (assert) {
        var neighborCells = cellsProvider.getNeighborCells(
          { direction: Direction.topLeft | Direction.topRight | Direction.bottom },
          [1, 1]);

        assert.deepEqual(neighborCells.map(function (c) { return c.getId(); }), [1, 3, 8]);
      });
  });