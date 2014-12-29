define(function () {
  return function (model) {
    var pThis = this;

    pThis.render = function () {
      var result = $('<table class="field" />');

      for (var y = 0; y < model.fieldSize[0]; y++) {
        var row = $('<tr />');
        result.append(row);

        for (var x = 0; x < model.fieldSize[1]; x++) {
          var cell = model.cells.filter(function (cellItem) {
            return cellItem.coords()[0] == x && cellItem.coords()[1] == y;
          });

          if (!cell || cell.length == 0) {
            continue;
          }

          var td = $('<td />');
          td.html(cell[0].render());
          row.append(td);
        }
      }

      return result;
    }
  }
});