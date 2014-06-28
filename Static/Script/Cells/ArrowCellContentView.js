(function (JK) {

    var common = JK.Common,
        cells = JK.Cells;

	JK.ArrowCellContentView = function (model) {
		var pThis = this,
            $node;

		pThis.render = function () {
            $node = $node || JK.ArrowCellContentView.uber.getNode();
            $node.addClass('arrowCellContent');
            $node.text(model.direction);
            return $node;
        };
	};

    common.inherit(JK.ArrowCellContentView, cells.CellContentView);
})(window.JK);