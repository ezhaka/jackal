(function (JK) {

    var common = JK.Common,
        cells = JK.Cells;

	JK.EmptyCellContentView = EmptyCellContentView;

    function EmptyCellContentView(model) {
		var pThis = this,
            $node;

		this.render = function () {
			$node = $node || EmptyCellContentView.uber.getNode();
            $node.addClass('emptyCellContent');
            return $node;
		};
	}

    common.inherit(EmptyCellContentView, cells.CellContentView);

})(window.JK);