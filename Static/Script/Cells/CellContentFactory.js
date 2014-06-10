(function () {

	if (!window.Jackal) {
		window.Jackal = {};
	}

	window.Jackal.cellContentType = {
		empty: 1,
		arrow: 2
	};

	window.Jackal.CellContentFactory = {};
	var factory = window.Jackal.CellContentFactory;

	factory.create = function (model) {
		switch (model.type) {
			case window.Jackal.cellContentType.empty:
				return new window.Jackal.EmptyCellContent(model);

			case window.Jackal.cellContentType.arrow:
				return new window.Jackal.ArrowCellContent(model);

			default:
				throw new Error('Unknown cell content type ' + model.type);
		}
	}

})();