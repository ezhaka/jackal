define(['Inheritance', 'cells/CellContentView'],
  function (Inheritance, CellContentView) {
    function ArrowCellContentView(model) {
      var pThis = this,
        $node;

      pThis.render = function () {
        $node = $node || ArrowCellContentView.uber.getNode();
        $node.addClass('arrowCellContent');
        $node.text(model.direction);
        return $node;
      };
    }

    Inheritance.inherit(ArrowCellContentView, CellContentView);
    return ArrowCellContentView;
  });