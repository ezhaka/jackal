(function (JK) {

    var common = JK.Common,
        cells = JK.Cells;

	JK.ArrowCellContent = ArrowCellContent;

    function ArrowCellContent(model) {
		var view;

        this.getView = function () {
            view = view || new JK.ArrowCellContentView(model);
            return view;
        };

		this.getMovingCapabilities = function (pirateId) {
			return {
				direction: model.direction,
				type: JK.movingCapabilites.neighbor,
				haveToMakeAnotherStep: true
			};
		};
	}

    common.inherit(ArrowCellContent, cells.CellContent);

})(window.JK);