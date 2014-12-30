define(['cell'], function (Cell) {
  return {
    generate: function (width, height) {
      var cells = [];
      var indx = 0;

      for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
          cells[indx] = new Cell({id: indx + 1, coords: [i, j]});
          indx++;
        }
      }

      return cells;
    }
  }
});