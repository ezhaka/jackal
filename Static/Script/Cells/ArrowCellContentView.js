(function () {

    var common = window.Jackal.Common,
        cells = window.Jackal.Cells;

	window.Jackal.ArrowCellContentView = function (model) {
		var pThis = this,
            $node;

		pThis.render = function () {
            $node = $node || window.Jackal.ArrowCellContentView.uber.getNode();
            $node.addClass('arrowCellContent');
            $node.text(model.direction);
            return $node;
        };
	};

    common.inherit(window.Jackal.ArrowCellContentView, cells.CellContentView);
})();