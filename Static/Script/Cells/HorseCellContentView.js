(function (JK) {

    var common = JK.Common,
        cells = JK.Cells;

    JK.HorseCellContentView = function (model) {
        var pThis = this,
            $node;

        pThis.render = function () {
            $node = $node || JK.HorseCellContentView.uber.getNode();
            $node.addClass('horseCellContent');
            $node.text(model.direction);
            return $node;
        };
    };

    common.inherit(JK.HorseCellContentView, cells.CellContentView);
})(window.JK);