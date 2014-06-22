(function () {

    var common = window.Jackal.Common,
        cells = window.Jackal.Cells;

	window.Jackal.ArrowCellContent = ArrowCellContent;

    function ArrowCellContent(model) {
		var view;

        this.getView = function () {
            view = view || new window.Jackal.ArrowCellContentView(model);
            return view;
        };

		this.getMovingCapabilities = function (pirateId) {
			return {
				direction: model.direction,
				type: window.Jackal.movingCapabilites.neighbor,
				haveToMakeAnotherStep: true
			};
		};
	}

    common.inherit(ArrowCellContent, cells.CellContent);

})();