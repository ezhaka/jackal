(function () {

    var common = window.Jackal.Common,
        cells = window.Jackal.Cells;

	window.Jackal.EmptyCellContent = EmptyCellContent;

    function EmptyCellContent() {
		var view;

		this.getMovingCapabilities = function (pirateId) {
			return {
				type: window.Jackal.movingCapabilites.neighbor
			}
		};

        this.getView = function () {
            view = view || new window.Jackal.EmptyCellContentView();
            return view;
        };
	}

    common.inherit(EmptyCellContent, cells.CellContent);
})();