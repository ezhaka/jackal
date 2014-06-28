(function (JK) {

	JK.cellContentType = {
		empty: 1,
		arrow: 2
	};

	JK.CellContentFactory = {};
	var factory = JK.CellContentFactory;

	factory.create = function (model) {
		switch (model.type) {
			case JK.cellContentType.empty:
				return new JK.EmptyCellContent(model);

			case JK.cellContentType.arrow:
				return new JK.ArrowCellContent(model);

			default:
				throw new Error('Unknown cell content type ' + model.type);
		}
	}

})(window.JK);