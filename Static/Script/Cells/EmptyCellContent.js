(function (JK) {

    var common = JK.Common,
        cells = JK.Cells;

	JK.EmptyCellContent = EmptyCellContent;

    function EmptyCellContent(model) {
		var view;

        this.getContentType = function () { return model.type; };

		this.getMovingCapabilities = function (pirateId) {
			return {
				type: JK.movingCapabilites.neighbor
			}
		};

        this.getView = function () {
            view = view || new JK.EmptyCellContentView();
            return view;
        };
	}

    common.inherit(EmptyCellContent, cells.CellContent);
})(window.JK);