define(['Inheritance', 'cells/CellContentView'],
  function (Inheritance, CellContentView) {
    function WaterCellContentView(model) {
      var pThis = this,
        $node;

      pThis.render = function () {
        $node = $node || WaterCellContentView.uber.getNode();
        $node.addClass('waterCellContent');
        $node.text(model.direction);
        return $node;
      };
    }

    Inheritance.inherit(WaterCellContentView, CellContentView);
    return WaterCellContentView;
  });