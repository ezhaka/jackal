(function () {

    var common = window.Jackal.Common,
        cells = window.Jackal.Cells;

	window.Jackal.EmptyCellContentView = EmptyCellContentView;

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

})();