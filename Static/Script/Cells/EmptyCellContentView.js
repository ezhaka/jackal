define(['cells/CellContentView', 'Inheritance'],
  function (CellContentView, Inheritance) {
    function EmptyCellContentView(model) {
      var pThis = this,
        $node;

      this.render = function () {
        $node = $node || EmptyCellContentView.uber.getNode();
        $node.addClass('emptyCellContent');
        return $node;
      };
    }

    Inheritance.inherit(EmptyCellContentView, CellContentView);
    return EmptyCellContentView;
  });