(function (JK) {

    var common = JK.Common,
        cells = JK.Cells;

    JK.WaterCellContentView = function (model) {
        var pThis = this,
            $node;

        pThis.render = function () {
            $node = $node || JK.WaterCellContentView.uber.getNode();
            $node.addClass('waterCellContent');
            $node.text(model.direction);
            return $node;
        };
    };

    common.inherit(JK.WaterCellContentView, cells.CellContentView);
})(window.JK);