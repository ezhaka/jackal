define(['Inheritance', 'cells/CellContentView'],
  function (Inheritance, CellContentView) {
    function HorseCellContentView(model) {
      var pThis = this,
        $node;

      pThis.render = function () {
        $node = $node || HorseCellContentView.uber.getNode();
        $node.addClass('horseCellContent');
        $node.text(model.direction);
        return $node;
      };
    }

    Inheritance.inherit(HorseCellContentView, CellContentView);
    return HorseCellContentView;
  });