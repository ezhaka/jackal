define(function () {
  return function (model) {
    var pThis = this;

    pThis.render = function () {
      var result = $('<table class="field" />');

      for (var i = 0; i < model.fieldSize[0]; i++) {
        var row = $('<tr />');
        result.append(row);

        for (var j = 0; j < model.fieldSize[1]; j++) {
          var cell = model.cells.filter(function (cellItem) {
            return cellItem.coords()[0] == i && cellItem.coords()[1] == j;
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